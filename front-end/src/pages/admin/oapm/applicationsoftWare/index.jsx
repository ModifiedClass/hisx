import React,{Component} from 'react';

import {Card,Table,Button,Icon,message,Modal,Tooltip} from 'antd'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
import {appFrameWork,dataBase} from '../../../../config/selectConfig'
import {rApplicationSoftwares,rDeviceInfos,couApplicationSoftware,dApplicationSoftware} from '../../../../api'
import AddForm from './addform'

export default class ApplicationSoftWare extends Component{
    state={
        applicationsoftwares:[],
        deviceinfos:[],
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
            dataIndex:'device',
            render:(device)=>{
                for(let key in this.DeviceinfoNames){
                    if(device.toString()===key){
                        return this.DeviceinfoNames[key]
                    }
                }
            }
        },{
            title:'部署',
            dataIndex:'deployment',
            onCell: () => {
                return {
                    style: {
                        maxWidth: 250,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow:'ellipsis',
                        cursor:'pointer'
                    }
                }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
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
        let display=''
        appFrameWork.map((item)=>{
            if(item.value===String(framework)){
                display= item.label
            }
        })
        return display
    }
    getDatabase=database=>{
        let display=''
        dataBase.map((item)=>{
            if(item.value===String(database)){
                display= item.label
            }
        })
        return display
    }
    initDeviceinfoNames=async(deviceinfos)=>{
        const DeviceinfoNames=deviceinfos? deviceinfos.reduce((pre,deviceinfo)=>{
            pre[deviceinfo._id]=deviceinfo.name
            return pre
        },{}):[]
        this.DeviceinfoNames=DeviceinfoNames
    }
    
    getApplicationSoftWares= async()=>{
        this.setState({loading:true})
        const result=await rApplicationSoftwares()
        this.setState({loading:false})
        if(result.status===1){
            const applicationsoftwares=result.data
            this.setState({applicationsoftwares})
        }else{
            message.error(result.msg)
        }
        const dis=await rDeviceInfos({'isPage':false})
        if(dis.status===1){
            this.initDeviceinfoNames(dis.data.list)
            this.setState({deviceinfos:dis.data.list})
        }
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
                    applicationsoftware._id=this.applicationsoftware._id
                }
                const result=await couApplicationSoftware(applicationsoftware)
                if(result.status===1){
                    message.success('操作成功')
                    this.getApplicationSoftWares()
                }else{
                    message.error(result.msg)
                }
            }
        })
        
    }
    
    deleteApplicationSoftWare=(applicationsoftware)=>{
        Modal.confirm({
            title:'确认删除'+applicationsoftware.name+'吗？',
            onOk:async()=>{
                const result=await dApplicationSoftware(applicationsoftware._id)
                if(result.status===1){
                    message.success('删除成功！')
                    this.getApplicationSoftWares()
                }
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
        const {applicationsoftwares,loading,isShow,deviceinfos}=this.state
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
                    deviceinfos={deviceinfos}
                    />
                </Modal>
            </Card>
        )
    }
}