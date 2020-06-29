import React,{Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Card,Table,Button,Icon,message,Modal} from 'antd'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rDcs,couDc,dDc} from '../../../../redux/actions/informationdevice-action'
import AddForm from './addform'
import {formateDate} from '../../../../utils/dateUtils'

class DeviceCategory extends Component{
    
    constructor(props){
        super(props)
        this.state={
            isShowAdd:false,
            loading:false,
            devicecategorys:[],  //所有类别,用于显示table数据
        }
    }

    initColums=()=>{
        this.columns=[
        {
            title:'编号',
            dataIndex:'_id',
        },{
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
            render:(devicecategory)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(devicecategory)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteDeviceCategory(devicecategory)}/>
            </span>
            )
        }
        ]
    }
    initDeviceCategorys=async ()=>{
        this.setState({loading:true})
        await this.props.rDcs()
        this.setState({loading:false})
        this.setState({devicecategorys:this.props.devicecategoryReducer.data})
    }

    showAdd=()=>{
        this.devicecategory=null
        this.setState({
            isShowAdd:true
        })
    }
    addOrUpdateDeviceCategory=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShowAdd:false})
                const devicecategory=values
                this.form.resetFields()
                if(this.devicecategory){
                    devicecategory._id=this.devicecategory._id
                }
                await this.props.couDc(devicecategory)
                const result=this.props.devicecategoryReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initDeviceCategorys()
                }else{
                    message.error(result.msg)
                }
            }
        })
    }

    showUpdate=(devicecategory)=>{
        this.devicecategory=devicecategory
        this.setState({isShowAdd:true})
    }
    
    deleteDeviceCategory=(devicecategory)=>{
        Modal.confirm({
            title:'确认删除 '+devicecategory.name+' 吗？',
            onOk:async()=>{
                await this.props.dDc(devicecategory._id)
                const result=this.props.devicecategoryReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initDeviceCategorys()
                }
            }
        })
    } 
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.initDeviceCategorys()
    }
    render(){
        const {loading,isShowAdd}=this.state
        const devicecategory=this.devicecategory||{}
        const title=(
             <span>
                 <Button type='primary' onClick={this.showAdd}><Icon type="unordered-list" />新增</Button>
             </span>)
        return(
            <Card title={title} >
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={this.props.devicecategoryReducer.data}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE}}
                />
                <Modal
                  title={devicecategory._id ? "编辑类别" : '新增类别'}
                  visible={isShowAdd}
                  onOk={this.addOrUpdateDeviceCategory}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShowAdd:false}) 
                  }}
                >
                    <AddForm setForm={(form)=>{this.form=form}} devicecategory={devicecategory}/>
                </Modal>
            </Card>
        )
    }
}

DeviceCategory.propTypes={
    devicecategoryReducer:PropTypes.object.isRequired,
    rDcs:PropTypes.func.isRequired,
    couDc:PropTypes.func.isRequired,
    dDc:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        devicecategoryReducer:state.devicecategoryReducer
    }
}

const mapDispatchToProps = {rDcs,couDc,dDc}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeviceCategory)