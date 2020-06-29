import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Card,Table,Button,Icon,message,Modal,Tooltip} from 'antd'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
import {appFrameWork,dataBase} from '../../../../config/selectConfig'
import {rAppss,couApps,dApps} from '../../../../redux/actions/oapm-action'
import {rDis} from '../../../../redux/actions/informationdevice-action'
import AddForm from './addform'

class ApplicationSoftWare extends Component{

    constructor(props){
        super(props)
        this.state={
            applicationsoftwares:[],
            deviceinfos:[],
            loading:false,
            isShow:false,
        }
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
        appFrameWork.forEach((item)=>{
            if(item.value===String(framework)){
                display= item.label
            }
        })
        return display
    }
    getDatabase=database=>{
        let display=''
        dataBase.forEach((item)=>{
            if(item.value===String(database)){
                display= item.label
            }
        })
        return display
    }
    initDeviceinfoNames=async deviceinfos =>{
        const DeviceinfoNames=deviceinfos? deviceinfos.reduce((pre,deviceinfo)=>{
            pre[deviceinfo._id]=deviceinfo.name
            return pre
        },{}):[]
        this.DeviceinfoNames=DeviceinfoNames
    }
    
    initApplicationSoftWares= async()=>{
        this.setState({loading:true})
        await this.props.rAppss()
        this.setState({loading:false})
        this.setState({applicationsoftwares:this.props.applicationSoftwareReducer.data})
        await this.props.rDis({'isPage':false})
        const dis=this.props.deviceinfoReducer.data.list
        this.initDeviceinfoNames(dis)
        this.setState({deviceinfos:dis})
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
                await this.props.couApps(applicationsoftware)
                const result=this.props.applicationSoftwareReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initApplicationSoftWares()
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
                await this.props.dApps(applicationsoftware._id)
                const result=this.props.applicationSoftwareReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initApplicationSoftWares()
                }
            }
        })
    }
   
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.initApplicationSoftWares()
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

ApplicationSoftWare.propTypes={
    applicationSoftwareReducer:PropTypes.object.isRequired,
    deviceinfoReducer:PropTypes.object.isRequired,
    rAppss:PropTypes.func.isRequired,
    couApps:PropTypes.func.isRequired,
    dApps:PropTypes.func.isRequired,
    rDis:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        applicationSoftwareReducer:state.applicationSoftwareReducer,
        deviceinfoReducer:state.deviceinfoReducer
    }
}

const mapDispatchToProps = {rAppss,couApps,dApps,rDis}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationSoftWare)