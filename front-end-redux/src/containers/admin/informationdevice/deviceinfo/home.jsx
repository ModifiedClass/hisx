import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
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
import {rDis,couDi,dDi} from '../../../../redux/actions/informationdevice-action'
import {deviceRunSystem} from '../../../../config/selectConfig'
const { Panel } = Collapse

class Home extends Component{

    constructor(props){
        super(props)
        this.state={
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
            status:'',
        }
    }
    
    initColums=()=>{
        this.columns=[
        {
            title:'id',
            dataIndex:'_id',
            width: 80,
        },{
            title:'设备类别型号',
            dataIndex:'devicemodel',
            width: 250,
            render:(devicemodel)=>{
               return devicemodel.devicecategory.name+' | '+devicemodel.name
            }
        },{
            title:'上级',
            dataIndex:'parent',
            width: 80,
            render:(parent)=>{
               return parent?parent.name:'无'
            }
        },{
            title:'设备名称',
            dataIndex:'name',
            width: 150,
        },{
            title:'安装位置',
            dataIndex:'installlocation',
            width: 200,
            render:(installlocation)=>{
                return installlocation.name
            }
        },{
            title:'序列号',
            dataIndex:'sn',
            width: 250,
        },{
            title:'系统',
            dataIndex:'runos',
            width: 250,
            render:(runos)=>{
                let runosdisplay=''
                deviceRunSystem.forEach(item=>{
                    if(item.value===String(runos)){
                        runosdisplay= item.label
                    }
                })
                return runosdisplay
            }
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
                if(status===2){
                    return (
                        <span>
                            <Tag color={BASE_RED}>维修</Tag>
                        </span>
                    )
                }else if(status===1){
                    return (
                        <span>
                            <Tag color={BASE_GREEN}>正常</Tag>
                        </span>
                    )
                }else if(status===3){
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
                <EditBtn onClick={()=>this.props.history.push('/deviceinfo/addorupdate',{deviceinfo})}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteDeviceInfo(deviceinfo)}/>
            </span>
            )
        }
        ]
    }
    
    initDeviceInfos= async(pageNum)=>{
        this.pageNum=pageNum
        const isPage=true
        this.setState({loading:true})
        const{
            devicecategory, 
            devicemodel,
            installlocation,
            runos,
            name,
            ip,
            mac,
            status,
            remarks
        }=this.state
        await this.props.rDis({
            isPage,
            pageNum,
            pageSize:PAGE_SIZE,
            devicecategory, 
            devicemodel,
            installlocation,
            runos,
            name,
            ip,
            mac,
            status,
            remarks
        })
        this.setState({loading:false})
        const {total,list}=this.props.deviceinfoReducer.data
        this.setState({deviceinfos:list,total})
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
    
    deleteDeviceInfo=(deviceinfo)=>{
        Modal.confirm({
            title:'确认删除'+deviceinfo.name+'吗？',
            onOk:async()=>{
                await this.props.dDi(deviceinfo._id)
                const result=this.props.deviceinfoReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initDeviceInfos(this.pageNum)
                }
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
            this.initDeviceInfos(this.pageNum)
        })
    }

    componentWillMount(){
        this.initColums()
    }
    
    componentDidMount(){
        this.initDeviceInfos(1)
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
                    onChange:this.initDeviceInfos //(pageNum)=>{this.initDeviceInfos(pageNum)}
                    }}
                />
            </Card>
        )
    }
}

Home.propTypes={
    deviceinfoReducer:PropTypes.object.isRequired,
    rDis:PropTypes.func.isRequired,
    couDi:PropTypes.func.isRequired,
    dDi:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        deviceinfoReducer:state.deviceinfoReducer
    }
}

const mapDispatchToProps = {rDis,couDi,dDi}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)