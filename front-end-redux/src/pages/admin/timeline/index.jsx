import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Card,Table,Button,Icon,message,Modal} from 'antd'

import EditBtn from '../../../components/editbtn'
import DeleteBtn from '../../../components/deletebtn'
import {PAGE_SIZE} from '../../../utils/constants'
import {rTls,couTl,dTl} from '../../../redux/actions/timeline'
import AddForm from './addform'
import {formateDate,shortDate} from '../../../utils/dateUtils'

class TimeLine extends Component{

    state={
        isShowAdd:false,
        loading:false,
        timelines:[],  //所有时间轴,用于显示table数据
    }
    initColums=()=>{
        this.columns=[
        {
            title:'事件',
            dataIndex:'name',
        },
        {
            title:'详情',
            dataIndex:'details',
        },
        {
            title:'创建时间',
            dataIndex:'create_time',
            render:(create_time)=>formateDate(create_time)
        },
        {
            title:'操作',
            width:300,
            render:(timeline)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(timeline)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteTimeLine(timeline)}/>
            </span>
            )
        }
        ]
    }
    getTimeLines=async ()=>{
        await this.props.rTls()
        const result=this.props.timelinemanage
        this.setState({ timelines:result.data })
    }

    showAdd=()=>{
        this.timeline=null
        this.setState({
            isShowAdd:true
        })
    }
    addOrUpdateTimeLine=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShowAdd:false})
                const timeline=values
                timeline.create_time=shortDate(values['create_time'])
                this.form.resetFields()
                if(this.timeline){
                    timeline._id=this.timeline._id
                }
                await this.props.couTl(timeline)
                const result=this.props.timelinemanage
                if(result.status===1){
                    message.success(result.msg)
                    this.getTimeLines()
                }else{
                    message.error(result.msg)
                }
            }
        })
    }

    showUpdate=(timeline)=>{
        this.timeline=timeline
        this.setState({isShowAdd:true})
    }
    
    deleteTimeLine=(timeline)=>{
        Modal.confirm({
            title:'确认删除 '+timeline.name+' 吗？',
            onOk:async()=>{
                await this.props.dTl(timeline._id)
                const result=this.props.timelinemanage
                if(result.status===1){
                    message.success(result.msg)
                    this.getTimeLines()
                }else{
                    message.error(result.msg)
                }
            }
        })
    } 
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getTimeLines()
    }
    render(){
        const {timelines,loading,isShowAdd}=this.state
        const timeline=this.timeline||{}
        const title=(
             <span>
                 <Button type='primary' onClick={this.showAdd}><Icon type="history" />新增</Button>
             </span>)
        return(
            <Card title={title} >
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={timelines}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE}}
                />
                <Modal
                  title={timeline._id ? "编辑时间轴" : '新增时间轴'}
                  visible={isShowAdd}
                  onOk={this.addOrUpdateTimeLine}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShowAdd:false}) 
                  }}
                >
                    <AddForm setForm={(form)=>{this.form=form}} timeline={timeline}/>
                </Modal>
            </Card>
        )
    }
}
export default connect(
    state=>({timelinemanage:state.timelinemanage}),
    {rTls,couTl,dTl}
)(TimeLine)