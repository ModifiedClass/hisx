import React,{Component} from 'react';

import {Card,Table,Button,Icon,message,Modal} from 'antd'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
//import {reqPrinterRepairs} from '../../../../../api'
import reqPrinterRepairs from '../../../../api/json/printerrepair.js'
import AddForm from './addform'
import ReviewForm from './reviewform'

export default class PrinterRepair extends Component{
    state={
        printerrepairs:[],
        loading:false,
        isShow:false,
        reviewShow:false,
        users:[]
    }
    initColums=()=>{
        this.columns=[
        {
            title:'日期',
            dataIndex:'create_time',
            render:(create_time)=>formateDate(create_time)
        },{
            title:'型号',
            dataIndex:'printer',
        },{
            title:'部门',
            dataIndex:'printer',
        },{
            title:'处理人员',
            dataIndex:'_handler',
        },{
            title:'状态',
            dataIndex:'status',
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
    
    getPrinterRepairs= async()=>{
        /*this.setState({loading:true})
        const {parentId}=this.state
        const result=await reqPrinterRepairs('0')
        this.setState({loading:false})
        if(result.status===0){
            const printerrepairs=result.data
            this.setState(printerrepairs)
        }else{
            message.error("获取数据失败!")
        }*/
        const printerrepairs=reqPrinterRepairs.data
        this.setState({printerrepairs})
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
                this.form.resetFields()
                if(this.printerrepair){
                    printerrepair.id=this.printerrepair._id
                }
                /*const result=await reqAddorUpdateUser(printerrepair)
                if(result.status===9){
                    message.success('${this.printerrepair? '新增':'编辑'}成功')
                    this.getPrinterRepairs()
                }else{
                    message.error(result.msg)
                }*/
                console.log(printerrepair)    
            }
        })
        
    }
    
    deletePrinterRepair=(printerrepair)=>{
        Modal.confirm({
            title:'确认删除'+printerrepair.name+'吗？',
            onOk:async()=>{
                /*const result=await reqdeletePrinterRepair(printerrepair._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getPrinterRepairs()
                }*/
                message.error(printerrepair.name)
            }
        })
    }
    
    reviewPrinterRepair=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({reviewShow:false})
                const _handler=values._handler
                console.log(_handler)
                this.form.resetFields()

                /*const result=await rePrinterRepair(_handler)
                if(result.status===1){
                    message.success('审核成功')
                    this.getPrinterRepairs()
                }else{
                    message.error(result.msg)
                }*/  
            }
        })
        
    }
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getPrinterRepairs()
    }
    render(){
        const {printerrepairs,loading,isShow,reviewShow,users}=this.state
        const printerrepair=this.printerrepair||{}
        const title=<span>
            <Button type='primary' onClick={this.showAdd}><Icon type='block'/>新增</Button>
            <Button type='primary' onClick={this.showReview}><Icon type='block'/>审核</Button>
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
                    handlers={users}
                    printerrepair={printerrepair}
                    />
                </Modal>
                <Modal
                  title={"审核" }
                  visible={reviewShow}
                  onOk={this.reviewPrinterRepair}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({reviewShow:false})
                  }}
                >
                    <ReviewForm
                    handlers={users}
                    setForm={(form)=>{this.form=form}} 
                    />
                </Modal>
            </Card>
        )
    }
}