import React,{Component} from 'react'
import {Card,Table,Button,Icon,message,Modal} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rBookCategorys} from '../../../../api'
import AddForm from './addform'
import {formateDate,shortDate} from '../../../../utils/dateUtils'
import SearchForm from './searchform'

export default class BorrowRecord extends Component{

    state={
        isShowAdd:false,
        loading:false,
        borrowrecords:[],  //所有时间轴,用于显示table数据
        bookcategorys:[],
        selectedBr:{},    //选中记录
    }
    initColums=()=>{
        this.columns=[
        {
            title:'书名',
            dataIndex:'book',
            render:(book)=>{return(book.name)}
        },
        {
            title:'借阅人',
            dataIndex:'reader',
            render:(reader)=>{return(reader.name)}
        },
        {
            title:'借出日期',
            dataIndex:'create_time',
            render:(create_time)=>formateDate(create_time)
        },{
            title:'归还日期',
            dataIndex:'return_time',
            render:(return_time)=>formateDate(return_time)
        },
        {
            title:'操作',
            width:300,
            render:(borrowrecord)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(borrowrecord)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteBorrowRecord(borrowrecord)}/>
            </span>
            )
        }
        ]
    }

    getBookCategorys=async ()=>{
        const result=await rBookCategorys()
        if(result.status===1){
            const bookcategorys=result.data
            this.setState({bookcategorys})            
        }
        
    }
    
    getBorrowRecords=async ()=>{
        /*await this.props.rTls()
        const result=this.props.borrowrecordmanage
        this.setState({ borrowrecords:result.data })*/
    }

    showAdd=()=>{
        this.borrowrecord=null
        this.setState({
            isShowAdd:true
        })
    }

    showReturn=()=>{
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
                borrowrecord.create_time=shortDate(values['create_time'])
                this.form.resetFields()
                if(this.borrowrecord){
                    borrowrecord._id=this.borrowrecord._id
                }
                /*await this.props.couTl(borrowrecord)
                const result=this.props.borrowrecordmanage
                if(result.status===1){
                    message.success(result.msg)
                    this.getBorrowRecords()
                }else{
                    message.error(result.msg)
                }*/
            }
        })
    }

    showUpdate=(borrowrecord)=>{
        this.borrowrecord=borrowrecord
        this.setState({isShowAdd:true})
    }
    
    deleteBorrowRecord=(borrowrecord)=>{
        Modal.confirm({
            title:'确认删除吗？',
            onOk:async()=>{
                /*await this.props.dTl(borrowrecord._id)
                const result=this.props.borrowrecordmanage
                if(result.status===1){
                    message.success(result.msg)
                    this.getBorrowRecords()
                }else{
                    message.error(result.msg)
                }*/
            }
        })
    } 

    setSearchItem=(searchItem)=>{
        this.setState({
            borrowrecord:searchItem.borrowrecord,

        },()=>{  //解决setState延迟
            this.getBorrowRecords(this.pageNum)
        })
    }

    returnBook=async()=>{
        const br=this.state.selectedBr||{}
        if(br&&br.name){
            Modal.confirm({
                title:'确认归还吗？',
                onOk:async()=>{
                    /*await this.props.dTl(borrowrecord._id)
                    const result=this.props.borrowrecordmanage
                    if(result.status===1){
                        message.success(result.msg)
                        this.getBorrowRecords()
                    }else{
                        message.error(result.msg)
                    }*/
                }
            })
        }else{
            message.error("请选择要归还的记录！")
        }
        
    }
    
    componentWillMount(){
        this.getBookCategorys()
        this.initColums()
    }
    componentDidMount(){
        this.getBorrowRecords()
    }
    render(){
        const {borrowrecords,loading,isShowAdd,bookcategorys,selectedBr}=this.state
        const borrowrecord=this.borrowrecord||{}
        const title=(
             <span>
                 <Button type='primary' onClick={this.showAdd}><Icon type="history" />借阅</Button>&nbsp;&nbsp;&nbsp;
                 <Button type='primary' onClick={this.showReturn} disabled={!selectedBr._id}><Icon type="history" />归还</Button>
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
                pagination={{defaultPageSize:PAGE_SIZE}}
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
            </Card>
        )
    }
}