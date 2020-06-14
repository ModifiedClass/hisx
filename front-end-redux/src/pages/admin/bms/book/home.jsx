import React,{Component} from 'react';
import {Card,Button,Modal,Icon,Table,message,Collapse} from 'antd'


import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import PreviewBtn from '../../../../components/previewbtn'
import {shortDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rBooks,dBook} from '../../../../api'
import SearchForm from './searchform'

const { Panel } = Collapse

export default class Home extends Component{
    state={
        books:[],
        total:0,
        loading:false,
        isShow:false,
        bookcategory:'',  //搜素关键字
        name:'',
        status:'',
    }
    
    initColums=()=>{
        this.columns=[{
            title:'图书类别',
            dataIndex:'bookcategory',
            width: 150,
            render:(bookcategory)=>{return(bookcategory.name)}
        },{
            title:'书名',
            dataIndex:'name',
            width: 250,
        },{
            title:'isbn',
            dataIndex:'isbn',
            width: 150,
        },{
            title:'作者',
            width: 100,
            dataIndex:'author',
        },{
            title:'出版社',
            width: 200,
            dataIndex:'publisher',
        },{
            title:'出版时间',
            width: 50,
            dataIndex:'publisheryear',
        },{
            title:'价格',
            width: 50,
            dataIndex:'price',
        },{
            title:'入库时间',
            dataIndex:'create_time',
            width: 100,
            render:(create_time)=>shortDate(create_time)
        },{
            title:'操作',
            fixed: 'right',
            width: 100,
            render:(book)=>(
            <span>
                <PreviewBtn onClick={()=>this.props.history.push('/book/detail',{book})}/>&nbsp;&nbsp;&nbsp;
                <EditBtn onClick={()=>this.props.history.push('/book/addorupdate',book)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteBook(book)}/>
            </span>
            )
        }]
    }
    getBooks= async(pageNum)=>{
        this.pageNum=pageNum
        const isPage=true
        this.setState({loading:true})
        const{bookcategory,name,status}=this.state
        let result = await rBooks({
            isPage,
            pageNum,
            pageSize:PAGE_SIZE,
            bookcategory,
            name,
            status
        })
        this.setState({loading:false})
        if(result.status===1){
            const {total,list}=result.data
            this.setState({books:list,total})
        }else{
            message.error(result.msg)
        }
    }

    showAdd=()=>{
        this.book=null
        this.setState({isShow:true})
    }
    
    showUpdate=(book)=>{
        this.book=book
        this.setState({isShow:true})
    }

    resetForm=()=>{
        this.form.resetFields()
    }
    
    deleteBook=(book)=>{
        Modal.confirm({
            title:'确认删除？',
            onOk:async()=>{
                const result=await dBook(book._id)
                if(result.status===1){
                    message.success('删除成功！')
                    this.getBooks(1)
                }
            }
        })
    }
    
    setSearchItem=(searchItem)=>{
        this.setState({
            bookcategory:searchItem.bookcategory,
            name:searchItem.name,
            status:searchItem.status
        },()=>{  //解决setState延迟
            this.getBooks(this.pageNum)
        })
    }

    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getBooks(1)
    }
    
    render(){
        const {books,total,loading}=this.state
        const title=(<span>
            <Button type='primary' onClick={()=>this.props.history.push('/book/addorupdate')}><Icon type='unordered-list'/>新增</Button>
            </span>)
 
        return(
            <Card title={title} >
                <Collapse>
                <Panel header="过滤" >
                <SearchForm setForm={(form)=>{this.form=form}} setSearchItem={this.setSearchItem}/>
                </Panel>
                </Collapse>
                <Table
                bordered
                size='small'
                rowKey='_id'
                loading={loading}
                dataSource={books}
                columns={this.columns}
                scroll={{ x: 1000 }}
                pagination={{
                    current:this.pageNum,
                    defaultPageSize:PAGE_SIZE,
                    ShowQuickJumper:true,
                    total,
                    onChange:this.getBooks
                    }}
                />
            </Card>
        )
    }
}