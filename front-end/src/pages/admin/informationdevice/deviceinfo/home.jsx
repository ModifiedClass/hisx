import React,{Component} from 'react';
import {
    Collapse,
    Card,
    Button,
    Modal,
    Icon,
    Table,
    message,
    Tag
    } from 'antd'

import {BASE_GREEN,BASE_RED,BASE_BLUE} from '../../../../utils/colors'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import PreviewBtn from '../../../../components/previewbtn'
import SearchForm from './searchform'
import {formateDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
//import {reqDeviceInfos} from '../../../../../api'
import reqDeviceInfos from '../../../../api/json/processedrecord.js'
const { Panel } = Collapse

export default class Home extends Component{
    state={
        deviceinfos:[],
        total:0,
        loading:false,
        isShow:false,
        devicecategory:'',  //搜素关键字
        devicemodel:'',
        installlocation:'',
        runos:'',
        name:'',
        ip:'',
        mac:'',
        status:''
    }
    
    initColums=()=>{
        this.columns=[
        {
            title:'id',
            dataIndex:'_id',
            width: 80,
        },{
            title:'设备类别',
            dataIndex:'devicecategory',
            width: 100,
        },{
            title:'设备型号',
            dataIndex:'devicemodel',
            width: 250,
        },{
            title:'上级',
            dataIndex:'parent',
            width: 80,
        },{
            title:'设备名称',
            dataIndex:'name',
            width: 150,
        },{
            title:'安装位置',
            dataIndex:'installlocation',
            width: 200,
        },{
            title:'序列号',
            dataIndex:'sn',
            width: 250,
        },{
            title:'系统',
            dataIndex:'runos',
            width: 250,
        },{
            title:'ip',
            dataIndex:'ip',
            width: 250,
        },{
            title:'mac',
            dataIndex:'mac',
            width: 250,
        },{
            title:'状态',
            width: 80,
            dataIndex:'status',
            render:(status)=>{
                if(status==='2'){
                    return (
                        <span>
                            <Tag color={BASE_RED}>维修</Tag>
                        </span>
                    )
                }else if(status==='1'){
                    return (
                        <span>
                            <Tag color={BASE_GREEN}>正常</Tag>
                        </span>
                    )
                }else if(status==='3'){
                    return (
                        <span>
                            <Tag color={BASE_BLUE}>停用</Tag>
                        </span>
                    )
                } else {
                    return (
                        <span></span>
                    )
                }  
            }
        },{
            title:'安装时间',
            dataIndex:'installdate',
            width: 150,
            render:(installdate)=>formateDate(installdate)
        },{
            title:'操作',
            fixed: 'right',
            width: 100,
            render:(deviceinfo)=>(
            <span>
                <PreviewBtn onClick={()=>this.props.history.push('/deviceinfo/detail',{deviceinfo})}/>&nbsp;&nbsp;&nbsp;
                <EditBtn onClick={()=>this.props.history.push('/deviceinfo/addorupdate',deviceinfo)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteDeviceInfo(deviceinfo)}/>
            </span>
            )
        }
        ]
    }
    
    getDeviceInfos= async(pageNum)=>{
        /*this.pageNum=pageNum
        this.setState({loading:true})
        const{
            devicecategory, 
            devicemodel,
            installlocation,
            runos,
            name,
            ip,
            mac,
            status
        }=this.state
        let result=reqDeviceInfos({
            pageNum,
            pageSize:PAGE_SIZE,
            devicecategory, 
            devicemodel,
            installlocation,
            runos,
            name,
            ip,
            mac,
            status
        })
        
        this.setState({loading:false})
        if(result.status===0){
        const {total,list}=result.data
            this.setState(deviceinfos:list,total)
        }else{
            message.error("获取数据失败!")
        }*/
        const deviceinfos=reqDeviceInfos.data
        this.setState({deviceinfos})
    }

    showAdd=()=>{
        this.deviceinfo=null
        this.setState({isShow:true})
    }
    
    showUpdate=(deviceinfo)=>{
        this.deviceinfo=deviceinfo
        this.setState({isShow:true})
    }

    resetForm=()=>{
        this.form.resetFields()
    }
    addOrUpdateDeviceInfo=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShow:false})
                const deviceinfo=values
                this.form.resetFields()
                if(this.deviceinfo){
                    deviceinfo.id=this.deviceinfo._id
                }
                /*const result=await reqAddorUpdateUser(deviceinfo)
                if(result.status===9){
                    message.success('${this.deviceinfo? '新增':'编辑'}成功')
                    this.getDeviceInfos()
                }else{
                    message.error(result.msg)
                }*/
                console.log(deviceinfo)
            }
        })
    }
    
    deleteDeviceInfo=(deviceinfo)=>{
        Modal.confirm({
            title:'确认删除'+deviceinfo.name+'吗？',
            onOk:async()=>{
                /*const result=await reqdeleteDeviceInfo(deviceinfo._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getDeviceInfos()
                }*/
                message.error(deviceinfo.name)
            }
        })
    }
    setSearchItem=(searchItem)=>{
        this.setState({
            devicecategory:searchItem.devicecategory,
            devicemodel:searchItem.devicemodel,
            installlocation:searchItem.installlocation,
            runos:searchItem.runos,
            name:searchItem.name,
            ip:searchItem.ip,
            mac:searchItem.mac,
            status:searchItem.status
        },()=>{  //解决setState延迟
            this.consoleitem(this.state)
            //this.getDeviceInfos()
        })
        console.log(searchItem.devicecategory)
    }
    consoleitem=(item)=>{
        console.log(item.devicecategory)
    }
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getDeviceInfos()
    }
    
    render(){
        const {deviceinfos,total,loading}=this.state
        const title=<Button type='primary' onClick={()=>this.props.history.push('/deviceinfo/addorupdate')}><Icon type='unordered-list'/>新增</Button>
        return(
            <Card title={title} >
                <Collapse>
                <Panel header="搜索" >
                <SearchForm setForm={(form)=>{this.form=form}} setSearchItem={this.setSearchItem}/>
                </Panel>
                </Collapse>
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={deviceinfos}
                columns={this.columns}
                scroll={{ x: 1000 }}
                pagination={{
                    defaultPageSize:PAGE_SIZE,
                    ShowQuickJumper:true,
                    total,
                    onChange:this.getDeviceInfos
                    }}
                />
            </Card>
        )
    }
}