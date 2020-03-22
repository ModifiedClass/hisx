import React,{Component} from 'react';

import {Card,Table,Button,Icon,message,Modal} from 'antd'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
//import {reqCartridays} from '../../../../../api'
import reqCartridays from '../../../../api/json/cartriday.js'
import AddForm from './addform'
import ReviewForm from './reviewform'

export default class Cartriday extends Component{
    state={
        cartridays:[],
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
            title:'处理人',
            dataIndex:'_handler',
        },{
            title:'数量',
            dataIndex:'nums',
        },{
            title:'状态',
            dataIndex:'status',
        },
        {
            title:'操作',
            width:300,
            render:(cartriday)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(cartriday)} />&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteCartriday(cartriday)} />
            </span>
            )
        }
        ]
    }
    
    getCartridays= async()=>{
        /*this.setState({loading:true})
        const {parentId}=this.state
        const result=await reqCartridays('0')
        this.setState({loading:false})
        if(result.status===0){
            const cartridays=result.data
            this.setState(cartridays)
        }else{
            message.error("获取数据失败!")
        }*/
        const cartridays=reqCartridays.data
        this.setState({cartridays})
    }

    showAdd=()=>{
        this.cartriday=null
        this.setState({isShow:true})
    }
    
    showUpdate=(cartriday)=>{
        this.cartriday=cartriday
        this.setState({isShow:true})
    }
    
    showReview=()=>{
        this.setState({reviewShow:true})
    }
    
    addOrUpdateCartriday=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShow:false})
                const cartriday=values
                this.form.resetFields()
                if(this.cartriday){
                    cartriday.id=this.cartriday._id
                }
                /*const result=await reqAddorUpdateUser(cartriday)
                if(result.status===9){
                    message.success('${this.cartriday? '新增':'编辑'}成功')
                    this.getCartridays()
                }else{
                    message.error(result.msg)
                }*/
                console.log(cartriday)    
            }
        })
        
    }
    
    deleteCartriday=(cartriday)=>{
        Modal.confirm({
            title:'确认删除'+cartriday.name+'吗？',
            onOk:async()=>{
                /*const result=await reqdeleteCartriday(cartriday._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getCartridays()
                }*/
                message.error(cartriday.name)
            }
        })
    }
    
    reviewCartriday=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({reviewShow:false})
                const cartriday=values
                this.form.resetFields()
                if(this.cartriday){
                    cartriday.id=this.cartriday._id
                }
                /*const result=await reqAddorUpdateUser(cartriday)
                if(result.status===9){
                    message.success('${this.cartriday? '新增':'编辑'}成功')
                    this.getCartridays()
                }else{
                    message.error(result.msg)
                }*/
                console.log(cartriday)    
            }
        })
        
    }
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getCartridays()
    }
    render(){
        const {cartridays,loading,isShow,reviewShow,users}=this.state
        const cartriday=this.cartriday||{}
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
                dataSource={cartridays}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE,ShowQuickJumper:true}}
                />
                
                <Modal
                  title={cartriday._id ? "编辑" : '新增'}
                  visible={isShow}
                  onOk={this.addOrUpdateCartriday}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShow:false})
                  }}
                >
                    <AddForm 
                    setForm={(form)=>{this.form=form}} 
                    cartriday={cartriday}
                    cartridays={cartridays}
                    />
                </Modal>
                <Modal
                  title={"审核" }
                  visible={reviewShow}
                  onOk={this.reviewCartriday}
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