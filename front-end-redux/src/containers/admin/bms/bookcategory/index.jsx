import React,{Component} from 'react';

import {Card,Table,Button,Icon,message,Modal} from 'antd'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rBookCategorys,couBookCategory,dBookCategory} from '../../../../api'
import AddForm from './addform'

export default class BookCategory extends Component{
    state={
        bookcategorys:[],
        loading:false,
        isShow:false,
    }
    initColums=()=>{
        this.columns=[
        {
            title:'id',
            dataIndex:'_id',
        },{
            title:'名称',
            dataIndex:'name',
        },
        {
            title:'创建时间',
            dataIndex:'create_time',
            render:(create_time)=>formateDate(create_time)
        },
        {
            title:'操作',
            width:300,
            render:(bookcategory)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(bookcategory)} />&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteBookCategory(bookcategory)} />
            </span>
            )
        }
        ]
    }
    
    getBookCategorys= async()=>{
        this.setState({loading:true})
        const result=await rBookCategorys()
        this.setState({loading:false})
        if(result.status===1){
            const bookcategorys=result.data
            this.setState({bookcategorys})
        }else{
            message.error(result.msg)
        }
    }

    showAdd=()=>{
        this.bookcategory=null
        this.setState({isShow:true})
    }
    
    showUpdate=(bookcategory)=>{
        this.bookcategory=bookcategory
        this.setState({isShow:true})
    }
    
    addOrUpdateBookCategory=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShow:false})
                const bookcategory=values
                this.form.resetFields()
                if(this.bookcategory){
                    bookcategory._id=this.bookcategory._id
                }
                const result=await couBookCategory(bookcategory)
                if(result.status===1){
                    message.success('操作成功')
                    this.getBookCategorys()
                }else{
                    message.error(result.msg)
                }
            }
        })
        
    }
    
    deleteBookCategory=(bookcategory)=>{
        Modal.confirm({
            title:'确认删除'+bookcategory.name+'吗？',
            onOk:async()=>{
                const result=await dBookCategory(bookcategory._id)
                if(result.status===1){
                    message.success('删除成功！')
                    this.getBookCategorys()
                }
            }
        })
    }
   
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getBookCategorys()
    }
    render(){
        const {bookcategorys,loading,isShow}=this.state
        const bookcategory=this.bookcategory||{}
        const title=<Button type='primary' onClick={this.showAdd}><Icon type='block'/>新增</Button>
        return(
            <Card title={title}>
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={bookcategorys}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE,ShowQuickJumper:true}}
                />
                
                <Modal
                  title={bookcategory._id ? "编辑类别" : '新增类别'}
                  visible={isShow}
                  onOk={this.addOrUpdateBookCategory}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShow:false})
                  }}
                >
                    <AddForm 
                    setForm={(form)=>{this.form=form}} 
                    bookcategory={bookcategory}
                    bookcategorys={bookcategorys}
                    />
                </Modal>
            </Card>
        )
    }
}