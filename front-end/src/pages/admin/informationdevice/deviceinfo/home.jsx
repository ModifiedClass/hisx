import React,{Component} from 'react';
import {
    Form, 
    Row, 
    Col,
    Card,
    Select,
    Input,
    Button,
    Modal,
    Icon,
    Table,
    message,
    Tooltip,
    Tag
    } from 'antd'

import {BASE_GREEN,BASE_RED,BASE_BLUE} from '../../../../utils/colors'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import PreviewBtn from '../../../../components/previewbtn'
import Search from './search'
import {formateDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
//import {reqDeviceInfos} from '../../../../../api'
import reqDeviceInfos from '../../../../api/json/processedrecord.js'

const Option=Select.Option

export default class Home extends Component{
    state={
        expand:false,
        deviceinfos:[],
        total:0,
        loading:false,
        isShow:false,
        searchName:'',  //搜素关键字
        searchType:''    //搜素类型
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
                if(status==='0'){
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
                }else{
                    return (
                        <span>
                            <Tag color={BASE_BLUE}>停用</Tag>
                        </span>
                    )
                }   
            }
        },{
            title:'安装时间',
            dataIndex:'installdate',
            width: 150,
            render:(create_time)=>formateDate(create_time)
        },{
            title:'操作',
            fixed: 'right',
            width: 100,
            render:(processedrecord)=>(
            <span>
                <PreviewBtn onClick={()=>this.props.history.push('/processedrecord/detail',{processedrecord})}/>&nbsp;&nbsp;&nbsp;
                <EditBtn onClick={()=>this.props.history.push('/processedrecord/addorupdate',processedrecord)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteDeviceInfo(processedrecord)}/>
            </span>
            )
        }
        ]
    }
    
    getDeviceInfos= async(pageNum)=>{
        /*this.pageNum=pageNum
        this.setState({loading:true})
        const{searchName,searchType}=this.state
        let result
        if(searchName){
            result=reqDeviceInfos({
                pageNum,
                pageSize:PAGE_SIZE,
                searchName,
                searchType
                })
        }else{
            result=await reqDeviceInfos(pageNum,PAGE_SIZE)
        }
        
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
        this.processedrecord=null
        this.setState({isShow:true})
    }
    
    showUpdate=(processedrecord)=>{
        this.processedrecord=processedrecord
        this.setState({isShow:true})
    }
    
    addOrUpdateDeviceInfo=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShow:false})
                const processedrecord=values
                this.form.resetFields()
                if(this.processedrecord){
                    processedrecord.id=this.processedrecord._id
                }
                /*const result=await reqAddorUpdateUser(processedrecord)
                if(result.status===9){
                    message.success('${this.processedrecord? '新增':'编辑'}成功')
                    this.getDeviceInfos()
                }else{
                    message.error(result.msg)
                }*/
                console.log(processedrecord)
            }
        })
    }
    
    deleteDeviceInfo=(processedrecord)=>{
        Modal.confirm({
            title:'确认删除'+processedrecord.name+'吗？',
            onOk:async()=>{
                /*const result=await reqdeleteDeviceInfo(processedrecord._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getDeviceInfos()
                }*/
                message.error(processedrecord.name)
            }
        })
    }
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getDeviceInfos()
    }
    
    render(){
        const {deviceinfos,total,loading,searchName,searchType,expand}=this.state
        const title=<Button style={{marginBottom:10}} type='primary' onClick={()=>this.props.history.push('/processedrecord/addorupdate')}><Icon type='unordered-list'/>新增</Button>
        const onFinish = values => {
            console.log('Received values of form: ', values);
        }
        const extra=<span>
             <Button style={{marginBottom:10}} type='primary' onClick={()=>{}}>搜索<Icon type='search'/></Button>
             <Button style={{ marginLeft: 8 }} type="button" onClick={()=>{}}><Icon type='reload'/>重置</Button>
        </span>
        return(
            <div>
            <Search />
            <Card title={title} extra={extra}>
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
            </div>
        )
    }
}