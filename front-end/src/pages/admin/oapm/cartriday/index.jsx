import React,{Component} from 'react';

import {Card,Table,Button,Icon,message,Modal} from 'antd'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
//import {reqProblemCategorys} from '../../../../../api'
import reqProblemCategorys from '../../../../api/json/problemcategory.js'
import AddForm from './addform'

export default class Cartriday extends Component{
    state={
        problemcategorys:[],
        loading:false,
        isShow:false,
    }
    initColums=()=>{
        this.columns=[
        {
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
            render:(problemcategory)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(problemcategory)} />&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteProblemCategory(problemcategory)} />
            </span>
            )
        }
        ]
    }
    
    getProblemCategorys= async()=>{
        /*this.setState({loading:true})
        const {parentId}=this.state
        const result=await reqProblemCategorys('0')
        this.setState({loading:false})
        if(result.status===0){
            const problemcategorys=result.data
            this.setState(problemcategorys)
        }else{
            message.error("获取数据失败!")
        }*/
        const problemcategorys=reqProblemCategorys.data
        this.setState({problemcategorys})
    }

    showAdd=()=>{
        this.problemcategory=null
        this.setState({isShow:true})
    }
    
    showUpdate=(problemcategory)=>{
        this.problemcategory=problemcategory
        this.setState({isShow:true})
    }
    
    addOrUpdateProblemCategory=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShow:false})
                const problemcategory=values
                this.form.resetFields()
                if(this.problemcategory){
                    problemcategory.id=this.problemcategory._id
                }
                /*const result=await reqAddorUpdateUser(problemcategory)
                if(result.status===9){
                    message.success('${this.problemcategory? '新增':'编辑'}成功')
                    this.getProblemCategorys()
                }else{
                    message.error(result.msg)
                }*/
                console.log(problemcategory)    
            }
        })
        
    }
    
    deleteProblemCategory=(problemcategory)=>{
        Modal.confirm({
            title:'确认删除'+problemcategory.name+'吗？',
            onOk:async()=>{
                /*const result=await reqdeleteProblemCategory(problemcategory._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getProblemCategorys()
                }*/
                message.error(problemcategory.name)
            }
        })
    }
   
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getProblemCategorys()
    }
    render(){
        const {problemcategorys,loading,isShow}=this.state
        const problemcategory=this.problemcategory||{}
        const title=<Button type='primary' onClick={this.showAdd}><Icon type='block'/>新增</Button>
        return(
            <Card title={title}>
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={problemcategorys}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE,ShowQuickJumper:true}}
                />
                
                <Modal
                  title={problemcategory._id ? "编辑类别" : '新增类别'}
                  visible={isShow}
                  onOk={this.addOrUpdateProblemCategory}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShow:false})
                  }}
                >
                    <AddForm 
                    setForm={(form)=>{this.form=form}} 
                    problemcategory={problemcategory}
                    problemcategorys={problemcategorys}
                    />
                </Modal>
            </Card>
        )
    }
}