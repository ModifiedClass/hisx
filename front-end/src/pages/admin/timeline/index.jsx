import React,{Component} from 'react';
import {Card,Table,Button,Icon,message,Modal} from 'antd'

import EditBtn from '../../../components/editbtn'
import DeleteBtn from '../../../components/deletebtn'
import {PAGE_SIZE} from '../../../utils/constants'
import reqTimeLines from '../../../api/json/timeline'
import AddForm from './addform'
import {formateDate} from '../../../utils/dateUtils'

export default class TimeLine extends Component{

    state={
        isShowAdd:false,
        loading:false,
        timelines:[],  //所有时间轴,用于显示table数据
        selectedTimeLine:''
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
                <EditBtn onClick={()=>this.showUpdate(timeline)}/>&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteTimeLine(timeline)}/>
            </span>
            )
        }
        ]
    }
    getTimeLines=async ()=>{
        /*const result=await reqTimeLines()
        if(result.status===0){
            const timelines=result.data
            this.setState({
                timelines:timelines
            })
        }*/
        const timelines=reqTimeLines.data
        this.setState({
            timelines
        })
    }
    
    //设置选中
    onRow=(timeline)=>{
        return{
            onClick:event=>{
                this.setState({
                    selectedTimeLine:timeline
                })
            }
        }
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
                this.form.resetFields()
                if(this.timeline){
                    timeline.id=this.timeline._id
                }
                /*const result=await reqAddorUpdateTimeLine(timeline)
                if(result.status===0){
                    message.success('${this.timeline? '新增':'编辑'}成功')
                    this.getTimeLines()
                }else{
                    message.error(result.msg)
                }*/
                console.log(timeline)
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
                /*const result=await reqdeleteTimeLine(timeline._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getUsers()
                }*/
                console.log(timeline.name)
                message.error(timeline.name)
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
        const {timelines,loading,selectedTimeLine,isShowAdd}=this.state
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
                rowSelection={{
                    type:'radio',
                    selectedRowKeys:[selectedTimeLine._id],
                    onSelect:(timeline)=>{
                        this.setState({
                            selectedTimeLine:timeline
                        })
                    }
                    }}
                onRow={this.onRow}
                />
                <Modal
                  title={timeline._id ? "编辑时间轴" : '新增时间轴'}
                  visible={isShowAdd}
                  onOk={this.addTimeLine}
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