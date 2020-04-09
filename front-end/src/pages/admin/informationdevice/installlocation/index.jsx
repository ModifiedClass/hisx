import React,{Component} from 'react';
import {Card,Table,Button,Icon,message,Modal} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {
    rInstallLocations,
    couInstallLocation,
    dInstallLocation
} from '../../../../api'
import AddForm from './addform'
import {formateDate} from '../../../../utils/dateUtils'

export default class InstallLocation extends Component{

    state={
        isShowAdd:false,
        loading:false,
        installlocations:[],  //所有安装地点,用于显示table数据
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
            render:(installlocation)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(installlocation)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteInstallLocation(installlocation)}/>
            </span>
            )
        }
        ]
    }
    getInstallLocations=async ()=>{
        this.setState({loading:true})
        const result=await rInstallLocations()
        this.setState({loading:false})
        if(result.status===1){
            const installlocations=result.data
            this.setState({
                installlocations
            })
        }
    }

    showAdd=()=>{
        this.installlocation=null
        this.setState({
            isShowAdd:true
        })
    }
    addOrUpdateInstallLocation=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShowAdd:false})
                const installlocation=values
                this.form.resetFields()
                if(this.installlocation){
                    installlocation._id=this.installlocation._id
                }
                const result=await couInstallLocation(installlocation)
                if(result.status===1){
                    message.success('操作成功')
                    this.getInstallLocations()
                }else{
                    message.error(result.msg)
                }
            }
        })
    }

    showUpdate=(installlocation)=>{
        this.installlocation=installlocation
        this.setState({isShowAdd:true})
    }
    
    deleteInstallLocation=(installlocation)=>{
        Modal.confirm({
            title:'确认删除 '+installlocation.name+' 吗？',
            onOk:async()=>{
                const result=await dInstallLocation(installlocation._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getInstallLocations()
                }
            }
        })
    } 
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getInstallLocations()
    }
    render(){
        const {installlocations,loading,isShowAdd}=this.state
        const installlocation=this.installlocation||{}
        const title=(
             <span>
                 <Button type='primary' onClick={this.showAdd}><Icon type="environment" />新增</Button>
             </span>)
        return(
            <Card title={title} >
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={installlocations}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE}}
                />
                <Modal
                  title={installlocation._id ? "编辑安装地点" : '新增安装地点'}
                  visible={isShowAdd}
                  onOk={this.addOrUpdateInstallLocation}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShowAdd:false}) 
                  }}
                >
                    <AddForm setForm={(form)=>{this.form=form}} installlocation={installlocation}/>
                </Modal>
            </Card>
        )
    }
}