import React,{Component} from 'react'
import {Card,Table,Button,Icon,message,Modal} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rBookStocks, couBookStock, dBookStock,couBook} from '../../../../api'
import AddForm from './addform'
import {shortDate} from '../../../../utils/dateUtils'
import SearchForm from './searchform'


export default class BookStock extends Component{

    state={
        total:0,
        isShowAdd:false,
        loading:false,
        bookstocks:[],  //用于显示table数据
        book:'',
        startdate:'',
        enddate:''
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
        },
        {
            title:'入库日期',
            dataIndex:'create_time',
            render:(create_time)=>shortDate(create_time)
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

    getBookStocks=async pageNum=>{
        this.pageNum=pageNum
        const isPage=true
        this.setState({loading:true})
        const{book,startdate,enddate}=this.state
        let result = await rBookStocks({
            isPage,
            pageNum,
            pageSize:PAGE_SIZE,
            book,
            startdate,
            enddate,
        })
        this.setState({loading:false})
        if(result.status===1){
            const {total,list}=result.data
            this.setState({bookstocks:list,total})
        }else{
            this.setState({bookstocks:[]})
            message.error(result.msg)
        }
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
                const result=await couBookStock(bookstock)
                if(result.status===1){
                    message.success(result.msg)
                    this.getBookStocks(1)
                }else{
                    message.error(result.msg)
                }
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
                const result=await dBookStock(bookstock._id)
                if(result.status===1){
                    message.success(result.msg)
                    this.getBookStocks(1)
                }
            }
        })
    } 
    
    setSearchItem=(searchItem)=>{
        this.setState({
            book:searchItem.book,
            startdate:searchItem.startdate,
            enddate:searchItem.enddate,
        },()=>{  //解决setState延迟
            this.getBookStocks(this.pageNum)
        })
    }

    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getBookStocks(1)
    }
    render(){
        const {bookstocks,loading,isShowAdd,total}=this.state
        const bookstock=this.bookstock||{}
        const title=(
             <span>
                 <Button type='primary' onClick={this.showAdd}><Icon type="history" />入库</Button>
             </span>)
        return(
            <Card title={title} >
                <SearchForm setForm={(form)=>{this.form=form}} setSearchItem={this.setSearchItem}/>
                <Table
                bordered
                size='small'
                rowKey='_id'
                loading={loading}
                dataSource={bookstocks}
                columns={this.columns}
                pagination={{
                    current:this.pageNum,
                    defaultPageSize:PAGE_SIZE,
                    ShowQuickJumper:true,
                    total,
                    onChange:this.getBooks
                    }}
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
                    <AddForm setForm={(form)=>{this.form=form}} bookstock={bookstock} bookstocks={bookstocks}/>
                </Modal>
            </Card>
        )
    }
}