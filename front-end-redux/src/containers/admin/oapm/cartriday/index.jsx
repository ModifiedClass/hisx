import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Card,Table,Button,Icon,message,Modal,Tag} from 'antd'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import {formateDate,shortDate} from '../../../../utils/dateUtils'
import {BASE_GREEN,BASE_YELLOW} from '../../../../utils/colors'
import {PAGE_SIZE} from '../../../../utils/constants'
import {rCds,couCd,dCd,reCd} from '../../../../redux/actions/oapm-action'
import {rUs,rGro} from '../../../../redux/actions/account-action'

import AddForm from './addform'
import ReviewForm from './reviewform'

class Cartriday extends Component{
    constructor(props){
        super(props)
        this.rev=React.createRef()
        this.state={
            cartridays:[],
            loading:false,
            isShow:false,
            reviewShow:false,
            users:[]
        }
    }
    
    initColums=()=>{
        this.columns=[
        {
            title:'日期',
            dataIndex:'create_time',
            render:(create_time)=>formateDate(create_time)
        },{
            title:'处理人员',
            dataIndex:'_handler',
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
            title:'数量',
            dataIndex:'nums',
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
    
    initUsers=async()=>{
        await this.props.rGro({'name':'信息科'})
        const gs=this.props.groupReducer
        const g=gs.data[0]._id
        await this.props.rUs({'group':g})
        const result=this.props.userReducer
        const users=result.data
        this.setState({users})            
    }
    
    initCartridays= async()=>{
        this.setState({loading:true})
        await this.props.rCds()
        this.setState({loading:false})
        this.setState({cartridays:this.props.cartridayReducer.data})
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
                cartriday.create_time=shortDate(values['create_time'])
                this.form.resetFields()
                if(this.cartriday){
                    cartriday._id=this.cartriday._id
                }
                await this.props.couCd(cartriday)
                const result=this.props.cartridayReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initCartridays()
                }else{
                    message.error(result.msg)
                }
            }
        })
        
    }
    
    deleteCartriday=(cartriday)=>{
        Modal.confirm({
            title:'确认删除'+cartriday.name+'吗？',
            onOk:async()=>{
                await this.props.dCd(cartriday._id)
                const result=this.props.cartridayReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.initCartridays()
                }
            }
        })
    }
    
    reviewCartriday=async()=>{
        this.setState({reviewShow:false})
        const _handler=this.rev.current.gethandler()
        await this.props.reCd(_handler)
        const result=this.props.cartridayReducer
        if(result.status===1){
            message.success(result.msg)
            this.initCartridays()
        }else{
            message.error(result.msg)
        }
    }
    
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.initCartridays()
        this.initUsers()
    }
    render(){
        const {cartridays,loading,isShow,reviewShow,users}=this.state
        const cartriday=this.cartriday||{}
        const title=<span>
            <Button type='primary' onClick={this.showAdd}><Icon type='download'/>新增</Button>&nbsp;&nbsp;
            <Button type='primary' onClick={this.showReview}><Icon type='file-done'/>审核</Button>
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
                    users={users}
                    cartriday={cartriday}
                    />
                </Modal>
                <Modal
                  title={"审核" }
                  visible={reviewShow}
                  onOk={this.reviewCartriday}
                  onCancel={()=>{
                      this.setState({reviewShow:false})
                  }}
                >
                    <ReviewForm
                    ref={this.rev}
                    users={users}
                    />
                </Modal>
            </Card>
        )
    }
}

Cartriday.propTypes={
    userReducer:PropTypes.object.isRequired,
    groupReducer:PropTypes.object.isRequired,
    cartridayReducer:PropTypes.object.isRequired,
    rCds:PropTypes.func.isRequired,
    couCd:PropTypes.func.isRequired,
    dCd:PropTypes.func.isRequired,
    reCd:PropTypes.func.isRequired,
    rUs:PropTypes.func.isRequired,
    rGro:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        userReducer:state.userReducer,
        groupReducer:state.groupReducer,
        cartridayReducer:state.cartridayReducer,
    }
}

const mapDispatchToProps = {rCds,couCd,dCd,reCd,rUs,rGro}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cartriday)