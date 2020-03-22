import React,{Component} from 'react';

import {Card,Table,Button,Icon,message,Modal} from 'antd'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
import {appFrameWork,dataBase} from '../../../../config/selectConfig'
import reqApplicationSoftWares from '../../../../api/json/applicationsoftware.js'
import AddForm from './addform'

export default class ApplicationSoftWare extends Component{
    state={
        applicationsoftwares:[],
        loading:false,
        isShow:false,
    }
    initColums=()=>{
        this.columns=[
        {
            title:'名称',
            dataIndex:'name',
        },{
            title:'架构',
            dataIndex:'framework',
            render:(framework)=>this.getFramework(framework),
        },{
            title:'数据库',
            dataIndex:'database',
            render:(database)=>this.getDatabase(database),
        },{
            title:'安装设备',
            dataIndex:'device_id',
            render:(device_id)=>this.getDeviceinfo(device_id),
        },{
            title:'部署',
            dataIndex:'deployment',
        },{
            title:'创建时间',
            dataIndex:'create_time',
            render:(create_time)=>formateDate(create_time)
        },{
            title:'操作',
            width:300,
            render:(applicationsoftware)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(applicationsoftware)} />&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteApplicationSoftWare(applicationsoftware)} />
            </span>
            )
        }
        ]
    }
    
    getFramework=framework=>{
        appFrameWork.map(item)=>{
            if(item.value===framework){
                return item.label
            }
        }
    }
    getDatabase=database=>{
        dataBase.map(item)=>{
            if(item.value===database){
                return item.label
            }
        }
    }
    getDeviceinfo=async(device_id)=>{
        const result=await rDeviceCategorys(device_id)
        if(result.status===1){
            return result[0].data.name
        }
    }
    getApplicationSoftWares= async()=>{
        /*this.setState({loading:true})
        const {parentId}=this.state
        const result=await reqApplicationSoftWares('0')
        this.setState({loading:false})
        if(result.status===0){
            const applicationsoftwares=result.data
            this.setState(applicationsoftwares)
        }else{
            message.error("获取数据失败!")
        }*/
        const applicationsoftwares=reqApplicationSoftWares.data
        this.setState({applicationsoftwares})
    }

    showAdd=()=>{
        this.applicationsoftware=null
        this.setState({isShow:true})
    }
    
    showUpdate=(applicationsoftware)=>{
        this.applicationsoftware=applicationsoftware
        this.setState({isShow:true})
    }
    
    addOrUpdateApplicationSoftWare=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShow:false})
                const applicationsoftware=values
                this.form.resetFields()
                if(this.applicationsoftware){
                    applicationsoftware.id=this.applicationsoftware._id
                }
                /*const result=await reqAddorUpdateUser(applicationsoftware)
                if(result.status===9){
                    message.success('${this.applicationsoftware? '新增':'编辑'}成功')
                    this.getApplicationSoftWares()
                }else{
                    message.error(result.msg)
                }*/
                console.log(applicationsoftware)    
            }
        })
        
    }
    
    deleteApplicationSoftWare=(applicationsoftware)=>{
        Modal.confirm({
            title:'确认删除'+applicationsoftware.name+'吗？',
            onOk:async()=>{
                /*const result=await reqdeleteApplicationSoftWare(applicationsoftware._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getApplicationSoftWares()
                }*/
                message.error(applicationsoftware.name)
            }
        })
    }
   
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getApplicationSoftWares()
    }
    render(){
        const {applicationsoftwares,loading,isShow}=this.state
        const applicationsoftware=this.applicationsoftware||{}
        const title=<Button type='primary' onClick={this.showAdd}><Icon type='block'/>新增</Button>
        return(
            <Card title={title}>
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={applicationsoftwares}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE,ShowQuickJumper:true}}
                />
                
                <Modal
                  title={applicationsoftware._id ? "编辑应用" : '新增应用'}
                  visible={isShow}
                  onOk={this.addOrUpdateApplicationSoftWare}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShow:false})
                  }}
                >
                    <AddForm 
                    setForm={(form)=>{this.form=form}} 
                    applicationsoftware={applicationsoftware}
                    applicationsoftwares={applicationsoftwares}
                    />
                </Modal>
            </Card>
        )
    }
}