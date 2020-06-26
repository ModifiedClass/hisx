import React,{Component} from 'react';

import {Card,Table,Button,Icon,message,Modal,Tag} from 'antd'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate,shortDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
import {BASE_GREEN,BASE_YELLOW} from '../../../../utils/colors'
import {rPrinterRepairs,couPrinterRepair,dPrinterRepair,rePrinterRepair,rUsers,rDeviceInfos,rGroups} from '../../../../api'
import AddForm from './addform'
import ReviewForm from './reviewform'

export default class PrinterRepair extends Component{
    constructor(props){
        super(props)
        this.rev=React.createRef()
    }
    state={
        printerrepairs:[],
        loading:false,
        isShow:false,
        reviewShow:false,
        users:[],
        deviceinfos:[]
    }
    initColums=()=>{
        this.columns=[
        {
            title:'日期',
            dataIndex:'create_time',
            render:(create_time)=>formateDate(create_time)
        },{
            title:'类别/型号/编号',
            dataIndex:'printer',
            render:(printer)=>{
                let display=''
                this.state.deviceinfos.forEach(di=>{
                    if(printer===di.id){
                        display=di.text
                    }
                })
                return display
            }
        },{
            title:'处理人员',
            dataIndex:'handler',
            render:(_handler)=>{
                let display=''
                this.state.users.forEach(user=>{
                    if(_handler===user._id){
                        display=user.name
                    }
                })
                return display
            }
        },{
            title:'状态',
            dataIndex:'status',
            render:(status)=>{
                if(status){
                    return (
                        <span>
                            <Tag color={BASE_GREEN}>已审核</Tag>
                        </span>
                    )
                }else{
                    return (
                        <span>
                            <Tag color={BASE_YELLOW}>未审核</Tag>
                        </span>
                    )
                }
            }
        },{
            title:'操作',
            width:300,
            render:(printerrepair)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(printerrepair)} />&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deletePrinterRepair(printerrepair)} />
            </span>
            )
        }
        ]
    }
    //初始化table设备类别/型号/sn列显示
    initDeviceinfos=async()=>{
        this.setState({deviceinfos:[]})
        const result=await rDeviceInfos({'isPage':false})
        const list=[]
        if(result.status===1){
           const obj=result.data.list
           for(let i=0;i<obj.length;i++){
               list.push({'id':obj[i]._id,'text':obj[i].devicemodel.devicecategory.name+'/'+obj[i].devicemodel.name+'/'+obj[i].sn})
           }
           this.setState({deviceinfos:list})
        }
    }
    //初始化用户用于传子控件
    initUsers=async()=>{
        const gs=await rGroups({'name':'信息科'})
        if(gs.status===1){
            const g=gs.data[0]._id
            const result=await rUsers({'group':g})
            if(result.status===1){
                const users=result.data
                this.setState({users})            
            }
        }
    }
    
    getPrinterRepairs= async()=>{
        this.setState({loading:true})
        const result=await rPrinterRepairs()
        this.setState({loading:false})
        if(result.status===1){
            const printerrepairs=result.data
            this.setState({printerrepairs})
        }else{
            message.error(result.msg)
        }
    }

    showAdd=()=>{
        this.printerrepair=null
        this.setState({isShow:true})
    }
    
    showUpdate=(printerrepair)=>{
        this.printerrepair=printerrepair
        this.setState({isShow:true})
    }
    
    showReview=()=>{
        this.setState({reviewShow:true})
    }
    
    addOrUpdatePrinterRepair=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShow:false})
                const printerrepair=values
                printerrepair.create_time=shortDate(values['create_time'])
                this.form.resetFields()
                if(this.printerrepair){
                    printerrepair._id=this.printerrepair._id
                }
                const result=await couPrinterRepair(printerrepair)
                if(result.status===1){
                    message.success(result.msg)
                    this.getPrinterRepairs()
                }else{
                    message.error(result.msg)
                }   
            }
        })
        
    }
    
    deletePrinterRepair=(printerrepair)=>{
        Modal.confirm({
            title:'确认删除'+printerrepair.name+'吗？',
            onOk:async()=>{
                const result=await dPrinterRepair(printerrepair._id)
                if(result.status===1){
                    message.success(result.msg)
                    this.getPrinterRepairs()
                }
            }
        })
    }
    
    reviewPrinterRepair=async()=>{
        this.setState({reviewShow:false})
        const handler=this.rev.current.gethandler()
        const result=await rePrinterRepair(handler)
        if(result.status===1){
            message.success(result.msg)
            this.getPrinterRepairs()
        }else{
            message.error(result.msg)
        }
    }
    
    componentWillMount(){
        this.initDeviceinfos()
        this.initColums()
    }
    componentDidMount(){
        this.getPrinterRepairs()
        this.initUsers()
    }
    render(){
        const {printerrepairs,loading,isShow,reviewShow,users}=this.state
        const printerrepair=this.printerrepair||{}
        const title=<span>
            <Button type='primary' onClick={this.showAdd}><Icon type='tool'/>新增</Button>&nbsp;&nbsp;
            <Button type='primary' onClick={this.showReview}><Icon type='file-done'/>审核</Button>
        </span>
        return(
            <Card title={title}>
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={printerrepairs}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE,ShowQuickJumper:true}}
                />
                
                <Modal
                  title={printerrepair._id ? "编辑" : '新增'}
                  visible={isShow}
                  onOk={this.addOrUpdatePrinterRepair}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShow:false})
                  }}
                >
                    <AddForm 
                    setForm={(form)=>{this.form=form}} 
                    users={users}
                    printerrepair={printerrepair}
                    />
                </Modal>
                <Modal
                  title={"审核" }
                  visible={reviewShow}
                  onOk={this.reviewPrinterRepair}
                  onCancel={()=>{
                      this.setState({reviewShow:false})
                  }}
                >
                    <ReviewForm
                    users={users}
                    ref={this.rev} 
                    />
                </Modal>
            </Card>
        )
    }
}