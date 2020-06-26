import React,{Component} from 'react'
import {Card,Table,Button,Icon,message,Modal,Tag} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {BASE_RED,BASE_GREEN} from '../../../../utils/colors'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rBorrowRecords, couBorrowRecord,dBorrowRecord} from '../../../../api'
import AddForm from './addform'
import ReturnForm from './returnform'
import {shortDate} from '../../../../utils/dateUtils'
import SearchForm from './searchform'

export default class BorrowRecord extends Component{

    state={
        total:0,
        isShowAdd:false,
        isShowReturn:false,
        loading:false,
        borrowrecords:[],  //用于显示table数据
        selectedBr:{},    //选中记录
        status:false,
        reader:0,
        book:'',
        bstartdate:'',
        benddate:'',
        rstartdate:'',
        renddate:'',
    }
    initColums=()=>{
        this.columns=[
        {
            title:'类别/书名',
            dataIndex:'book',
            render:(book)=>{return(book.bookcategory.name+'/'+book.name)}
        },
        {
            title:'借阅人',
            dataIndex:'reader',
            width:120,
            render:(reader)=>{return(reader.username+'-'+reader.name)}
        },
        {
            title:'借出日期',
            dataIndex:'create_time',
            width:100,
            render:(create_time)=>shortDate(create_time)
        },{
            title:'归还状态',
            dataIndex:'status',
            width:80,
            render:(status)=>{
                if(status){
                    return (
                        <span>
                            <Tag color={BASE_GREEN}>已归还</Tag>
                        </span>
                    )
                }else{
                    return (
                        <span>
                            <Tag color={BASE_RED}>未归还</Tag>
                        </span>
                    )
                }
            }
        },{
            title:'归还日期',
            dataIndex:'return_time',
            width:100,
            render:(return_time)=>shortDate(return_time)
        },
        {
            title:'操作',
            width:80,
            render:(borrowrecord)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(borrowrecord)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteBorrowRecord(borrowrecord)}/>
            </span>
            )
        }
        ]
    }

    
    getBorrowRecords=async pageNum=>{
        this.pageNum=pageNum
        const isPage=true
        this.setState({loading:true})
        const{status,book,reader,bstartdate,benddate,rstartdate,renddate}=this.state
        const br={
            isPage,
            pageNum,
            pageSize:PAGE_SIZE,
            status,
            book,
            bstartdate,
            benddate,
            rstartdate,
            renddate,
        }
        if(reader) br.reader=reader
        let result = await rBorrowRecords(br)
        this.setState({loading:false})
        if(result.status===1){
            const {total,list}=result.data
            this.setState({borrowrecords:list,total})
        }else{
            this.setState({borrowrecords:[]})
            message.error(result.msg)
        }
    }

    showAdd=()=>{
        this.borrowrecord=null
        this.setState({
            isShowAdd:true
        })
    }

    onRow=(borrowrecord)=>{
        return{
            onClick:event=>{
                this.setState({
                    selectedBr:borrowrecord,
                })
            }
        }
    }

    addOrUpdateBorrowRecord=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShowAdd:false})
                const borrowrecord=values
                if(borrowrecord.stock<1){
                    message.error("库存不足")
                }else{
                    borrowrecord.create_time=shortDate(values['create_time'])
                    this.form.resetFields()
                    if(this.borrowrecord){
                        borrowrecord._id=this.borrowrecord._id
                    }
                    borrowrecord.status=false
                    const result=await couBorrowRecord(borrowrecord)
                    if(result.status===1){
                        message.success(result.msg)
                        this.getBorrowRecords(1)
                    }else{
                        message.error(result.msg)
                    }
                }
            }
        })
    }

    showUpdate=(borrowrecord)=>{
        this.borrowrecord=borrowrecord
        this.setState({isShowAdd:true})
    }

    showReturn=()=>{
        this.setState({
            isShowReturn:true
        })
    }
    
    deleteBorrowRecord=(borrowrecord)=>{
        Modal.confirm({
            title:'确认删除吗？',
            onOk:async()=>{
                const result=await dBorrowRecord(borrowrecord._id)
                if(result.status===1){
                    message.success(result.msg)
                    this.getBorrowRecords(1)
                }
            }
        })
    } 

    setSearchItem=(searchItem)=>{
        this.setState({
            status:searchItem.status,
            reader:searchItem.reader,
            book:searchItem.book,
            bstartdate:searchItem.bstartdate,
            benddate:searchItem.benddate,
            rstartdate:searchItem.rstartdate,
            renddate:searchItem.renddate,

        },()=>{  //解决setState延迟
            this.getBorrowRecords(this.pageNum)
        })
    }

    returnBook=async()=>{
        const br=this.state.selectedBr||{}
        const obj={}
        if(br&&br.book.name){
            Modal.confirm({
                title:'确认归还吗？',
                onOk:async()=>{
                    obj.status=true
                    let localdate=new Date()
                    obj.return_time=shortDate(localdate)
                    obj._id=br._id
                    const result=await couBorrowRecord(obj)
                    if(result.status===1){
                        message.success(result.msg)
                        this.getBorrowRecords(1)
                    }
                }
            })
        }else{
            message.error("请选择要归还的记录！")
        }
        this.setState({isShowReturn:false})
        
    }
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getBorrowRecords(1)
    }
    render(){
        const {borrowrecords,loading,isShowAdd,isShowReturn,bookcategorys,selectedBr,total}=this.state
        const borrowrecord=this.borrowrecord||{}
        const title=(
             <span>
                 <Button type='primary' onClick={this.showAdd}><Icon type="history" />借阅</Button>&nbsp;&nbsp;&nbsp;
                 <Button type='primary' onClick={this.showReturn} disabled={!selectedBr._id||selectedBr.status}><Icon type="rollback" />归还</Button>
             </span>)
        return(
            <Card title={title} >
                <SearchForm setForm={(form)=>{this.form=form}} setSearchItem={this.setSearchItem}/>
                <Table
                bordered
                size='small'
                rowKey='_id'
                loading={loading}
                dataSource={borrowrecords}
                columns={this.columns}
                pagination={{
                    current:this.pageNum,
                    defaultPageSize:PAGE_SIZE,
                    ShowQuickJumper:true,
                    total,
                    onChange:this.getBooks
                    }}
                rowSelection={{
                type:'radio',
                selectedRowKeys:[selectedBr._id],
                onSelect:(borrowrecord)=>{
                    this.setState({
                        selectedBr:borrowrecord,
                    })
                }
                }}
                onRow={this.onRow}
                />
                <Modal
                  title={borrowrecord._id ? "编辑借阅" : '新增借阅'}
                  visible={isShowAdd}
                  onOk={this.addOrUpdateBorrowRecord}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShowAdd:false}) 
                  }}
                >
                    <AddForm setForm={(form)=>{this.form=form}} borrowrecord={borrowrecord} bookcategorys={bookcategorys}/>
                </Modal>
                <Modal
                  title={"归还"}
                  visible={isShowReturn}
                  onOk={this.returnBook}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShowReturn:false}) 
                  }}
                >
                    <ReturnForm setForm={(form)=>{this.form=form}} borrowrecord={selectedBr}/>
                </Modal>
            </Card>
        )
    }
}