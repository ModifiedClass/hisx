import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Card,Table,Button,Icon,message,Modal} from 'antd'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rPcs,couPc,dPc} from '../../../../redux/actions/oapm-action'
import AddForm from './addform'

class ProblemCategory extends Component{
    state={
        problemcategorys:[],
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
            render:(problemcategory)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(problemcategory)} />&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteProblemCategory(problemcategory)} />
            </span>
            )
        }
        ]
    }
    
    initProblemCategorys= async()=>{
        this.setState({loading:true})
        await this.props.rPcs()
        this.setState({loading:false})
        this.setState({problemcategorys:this.props.problemCategoryReducer.data})

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
                    problemcategory._id=this.problemcategory._id
                }
                await this.props.couPc(problemcategory)
                const result=this.props.problemCategoryReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initProblemCategorys()
                }else{
                    message.error(result.msg)
                }
            }
        })
        
    }
    
    deleteProblemCategory=(problemcategory)=>{
        Modal.confirm({
            title:'确认删除'+problemcategory.name+'吗？',
            onOk:async()=>{
                await this.props.dPc(problemcategory._id)
                const result=this.props.problemCategoryReducer
                if(result.status===1){
                    message.success('删除成功！')
                    this.initProblemCategorys()
                }
            }
        })
    }
   
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.initProblemCategorys()
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

ProblemCategory.propTypes={
    problemCategoryReducer:PropTypes.object.isRequired,
    rPcs:PropTypes.func.isRequired,
    couPc:PropTypes.func.isRequired,
    dPc:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        problemCategoryReducer:state.problemCategoryReducer,
    }
}

const mapDispatchToProps = {rPcs,couPc,dPc}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProblemCategory)