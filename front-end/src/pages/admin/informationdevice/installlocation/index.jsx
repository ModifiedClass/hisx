import React,{Component} from 'react';
import {Card,Table,Button,Icon,message,Modal} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import reqInstallLocations from '../../../../api/json/installlocation'
import AddForm from './addform'
import {formateDate} from '../../../../utils/dateUtils'

export default class InstallLocation extends Component{

    state={
        isShowAdd:false,
        loading:false,
        installlocations:[],  //所有安装地点,用于显示table数据
        selectedInstallLocation:''
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
        /*const result=await reqInstallLocations()
        if(result.status===0){
            const installlocations=result.data
            this.setState({
                installlocations:installlocations
            })
        }*/
        const installlocations=reqInstallLocations.data
        this.setState({
            installlocations
        })
    }
    
    //设置选中
    onRow=(installlocation)=>{
        return{
            onClick:event=>{
                this.setState({
                    selectedInstallLocation:installlocation
                })
            }
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
                    installlocation.id=this.installlocation._id
                }
                /*const result=await reqAddorUpdateInstallLocation(installlocation)
                if(result.status===0){
                    message.success('${this.installlocation? '新增':'编辑'}成功')
                    this.getInstallLocations()
                }else{
                    message.error(result.msg)
                }*/
                console.log(installlocation)
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
                /*const result=await reqdeleteInstallLocation(installlocation._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getUsers()
                }*/
                console.log(installlocation.name)
                message.error(installlocation.name)
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
        const {installlocations,loading,selectedInstallLocation,isShowAdd}=this.state
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
                rowSelection={{
                    type:'radio',
                    selectedRowKeys:[selectedInstallLocation._id],
                    onSelect:(installlocation)=>{
                        this.setState({
                            selectedInstallLocation:installlocation
                        })
                    }
                    }}
                onRow={this.onRow}
                />
                <Modal
                  title={installlocation._id ? "编辑安装地点" : '新增安装地点'}
                  visible={isShowAdd}
                  onOk={this.addInstallLocation}
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