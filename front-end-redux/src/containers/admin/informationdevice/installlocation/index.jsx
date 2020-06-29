import React,{Component} from 'react';
import {Card,Table,Button,Icon,message,Modal} from 'antd'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rIls,couIl,dIl} from '../../../../redux/actions/informationdevice-action'
import AddForm from './addform'
import {formateDate} from '../../../../utils/dateUtils'

class InstallLocation extends Component{

    constructor(props){
        super(props)
        this.state={
            isShowAdd:false,
            loading:false,
            installlocations:[],  //所有安装地点,用于显示table数据
        }
    }

    initColums=()=>{
        this.columns=[
        {
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
            render:(installlocation)=>(
            <span>
                <EditBtn onClick={()=>this.showUpdate(installlocation)}/>&nbsp;&nbsp;&nbsp;
                <DeleteBtn onClick={()=>this.deleteInstallLocation(installlocation)}/>
            </span>
            )
        }
        ]
    }
    initInstallLocations=async ()=>{
        this.setState({loading:true})
        await this.props.rIls()
        this.setState({loading:false})
        this.setState({ installlocations:this.props.installlocationReducer.data })
    }

    showAdd=()=>{
        this.installlocation=null
        this.setState({
            isShowAdd:true
        })
    }
    addOrUpdateInstallLocation=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShowAdd:false})
                const installlocation=values
                this.form.resetFields()
                if(this.installlocation){
                    installlocation._id=this.installlocation._id
                }
                await this.props.couIl(installlocation)
                const result=this.props.installlocationReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initInstallLocations()
                }else{
                    message.error(result.msg)
                }
            }
        })
    }

    showUpdate=(installlocation)=>{
        this.installlocation=installlocation
        this.setState({isShowAdd:true})
    }
    
    deleteInstallLocation=(installlocation)=>{
        Modal.confirm({
            title:'确认删除 '+installlocation.name+' 吗？',
            onOk:async()=>{
                await this.props.dIl(installlocation._id)
                const result=this.props.installlocationReducer
                if(result.status===0){
                    message.success(result.msg)
                    this.initInstallLocations()
                }
            }
        })
    } 
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.initInstallLocations()
    }
    render(){
        const {installlocations,loading,isShowAdd}=this.state
        const installlocation=this.installlocation||{}
        const title=(
             <span>
                 <Button type='primary' onClick={this.showAdd}><Icon type="environment" />新增</Button>
             </span>)
        return(
            <Card title={title} >
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={installlocations}
                columns={this.columns}
                pagination={{defaultPageSize:PAGE_SIZE}}
                />
                <Modal
                  title={installlocation._id ? "编辑安装地点" : '新增安装地点'}
                  visible={isShowAdd}
                  onOk={this.addOrUpdateInstallLocation}
                  onCancel={()=>{
                      this.form.resetFields()
                      this.setState({isShowAdd:false}) 
                  }}
                >
                    <AddForm setForm={(form)=>{this.form=form}} installlocation={installlocation}/>
                </Modal>
            </Card>
        )
    }
}

InstallLocation.propTypes={
    installlocationReducer:PropTypes.object.isRequired,
    rIls:PropTypes.func.isRequired,
    couIl:PropTypes.func.isRequired,
    dIl:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        installlocationReducer:state.installlocationReducer
    }
}

const mapDispatchToProps = {rIls,couIl,dIl}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InstallLocation)