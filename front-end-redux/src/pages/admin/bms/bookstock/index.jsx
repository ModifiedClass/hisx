import React,{Component} from 'react'
import {Card,Table,Button,Icon,message,Modal} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rBookCategorys} from '../../../../api'
import AddForm from './addform'
import {formateDate,shortDate} from '../../../../utils/dateUtils'

export default class BookStock extends Component{

    state={
        isShowAdd:false,
        loading:false,
        bookstocks:[],  //所有时间轴,用于显示table数据
        bookcategorys:[]
    }
    initColums=()=>{
        this.columns=[
        {
            title:'书名',
            dataIndex:'book',
            render:(book)=>{return(book.name)}
        },
        {
            title:'数量',
            dataIndex:'nums',
            render:(reader)=>{return(reader.name)}
        },
        {
            title:'入库日期',
            dataIndex:'create_time',
            render:(create_time)=>formateDate(create_time)
        },
        {
            title:'操作',
            width:300,
            render:(bookstock)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(bookstock)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteBookStock(bookstock)}/>
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
    
    getBookStocks=async ()=>{
        /*await this.props.rTls()
        const result=this.props.bookstockmanage
        this.setState({ bookstocks:result.data })*/
    }

    showAdd=()=>{
        this.bookstock=null
        this.setState({
            isShowAdd:true
        })
    }
    addOrUpdateBookStock=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShowAdd:false})
                const bookstock=values
                bookstock.create_time=shortDate(values['create_time'])
                this.form.resetFields()
                if(this.bookstock){
                    bookstock._id=this.bookstock._id
                }
                /*await this.props.couTl(bookstock)
                const result=this.props.bookstockmanage
                if(result.status===1){
                    message.success(result.msg)
                    this.getBookStocks()
                }else{
                    message.error(result.msg)
                }*/
            }
        })
    }

    showUpdate=(bookstock)=>{
        this.bookstock=bookstock
        this.setState({isShowAdd:true})
    }
    
    deleteBookStock=(bookstock)=>{
        Modal.confirm({
            title:'确认删除吗？',
            onOk:async()=>{
                /*await this.props.dTl(bookstock._id)
                const result=this.props.bookstockmanage
                if(result.status===1){
                    message.success(result.msg)
                    this.getBookStocks()
                }else{
                    message.error(result.msg)
                }*/
            }
        })
    } 
    
    componentWillMount(){
        this.getBookCategorys()
        this.initColums()
    }
    componentDidMount(){
        this.getBookStocks()
    }
    render(){
        const {bookstocks,loading,isShowAdd,bookcategorys}=this.state
        const bookstock=this.bookstock||{}
        const title=(
             <span>
                 <Button type='primary' onClick={this.showAdd}><Icon type="history" />入库</Button>
             </span>)
        return(
            <Card title={title} >
                <Table
                bordered
                size='small'
                rowKey='_id'
                loading={loading}
                dataSource={bookstocks}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE}}
                />
                <Modal
                  title={bookstock._id ? "编辑入库" : '新增入库'}
                  visible={isShowAdd}
                  onOk={this.addOrUpdateBookStock}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShowAdd:false}) 
                  }}
                >
                    <AddForm setForm={(form)=>{this.form=form}} bookstock={bookstock} bookcategorys={bookcategorys}/>
                </Modal>
            </Card>
        )
    }
}