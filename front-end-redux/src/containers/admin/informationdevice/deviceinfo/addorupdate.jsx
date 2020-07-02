import React,{Component} from 'react'
import {connect} from 'react-redux'

import {Card,Form,Input,Select,Button,Icon,DatePicker,message} from 'antd'
import BackBtn from '../../../../components/backbtn'

import {shortDate} from '../../../../utils/dateUtils'
import {deviceRunSystem,deviceStatus} from '../../../../config/selectConfig'
import {rDcs,rDms,rIls,rDis,couDi} from '../../../../redux/actions/informationdevice-action'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const Item=Form.Item
const Option=Select.Option
const {TextArea}=Input
const thisDate=shortDate(Date.now())

class AddOrUpdate extends Component{

    state={
        devicecategorys:[],
        devicemodels:[],
        parents:[],
        installlocations:[]
    }

    getDM=async value =>{
        this.setState({devicemodels:[]})
        await this.props.rDms({'devicecategory':value})
        const result=this.props.devicemodelReducer
        this.setState({devicemodels:result.data})
    }
    
    initSelect=async()=>{
        await this.props.rDcs()
        const devicecategorys=this.props.devicecategoryReducer
        this.setState({devicecategorys:devicecategorys.data})
        
        await this.props.rIls()
        const installlocations=this.props.installlocationReducer
        this.setState({installlocations:installlocations.data})
        
        await this.props.rDis({'isPage':false})
        const deviceinfos=this.props.deviceinfoReducer
        this.setState({parents:deviceinfos.data.list})            
    }
    

    submit=()=>{
        this.props.form.validateFields(async (error,values)=>{
            if(!error){
                const deviceinfo=values
                if(this.deviceinfo.deviceinfo){
                    deviceinfo._id=this.deviceinfo.deviceinfo._id
                }
                await this.props.couDi(deviceinfo)
                const result=this.props.deviceinfoReducer
                if(result.status===1){
                    message.success(result.msg)
                    this.props.history.goBack()
                }else{
                    message.error(result.msg)
                }
            }
        })
    }
    
    componentDidMount(){
        this.initSelect()
    }
    
    componentWillMount(){
        const deviceinfo=this.props.location.state
        this.isUpdate=!!deviceinfo
        //{}空对象 避免undifine
        this.deviceinfo=deviceinfo ||{}
    }
    render(){
        const {isUpdate,deviceinfo}=this
        const {devicecategorys,devicemodels,installlocations,parents} =this.state
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:2},
            wrapperCol:{span:8}
        }

        const title=(
            <span>
                <BackBtn onClick={()=>this.props.history.goBack()}/>
                <span>{isUpdate ? '更新设备':'新增设备'}</span>
            </span>
        )
        return(
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="上级设备">
                    {getFieldDecorator('parent',{
                        initialValue:isUpdate ? deviceinfo.deviceinfo.parent :'',
                    })(
                        <Select>
                            {
                                parents.map(ps=><Option key={ps._id} value={ps._id}>{ps.name}-{ps.sn}</Option>)
                            }
                        </Select>
                    )}
                    </Item>
                    <Item label="设备类别">
                    {getFieldDecorator('devicecategory',{
                        initialValue:isUpdate ? deviceinfo.deviceinfo.devicemodel.devicecategory._id :1,
                        rules:[
                        {
                            required:true,message:'设备类别不能为空!'
                        }
                        ]
                    })(
                        <Select onChange={this.getDM}>
                            {
                                devicecategorys.map(ps=><Option key={ps._id} value={ps._id}>{ps.name}</Option>)
                            }
                        </Select>
                    )}
                    </Item>
                    <Item label="设备型号">
                    {getFieldDecorator('devicemodel',{
                        initialValue:isUpdate ? deviceinfo.deviceinfo.devicemodel._id :1,
                    })(
                        <Select>
                            {
                                devicemodels.map(ps=><Option key={ps._id} value={ps._id}>{ps.name}</Option>)
                            }
                        </Select>
                    )}
                    </Item>
                    <Item label="序列号">
                    {getFieldDecorator('sn',{
                        initialValue:isUpdate ? deviceinfo.deviceinfo.sn : '',
                    })(
                        <Input placeholder='序列号' />
                    )}
                    </Item>
                    <Item label="设备名称">
                    {getFieldDecorator('name',{
                        initialValue:isUpdate ? deviceinfo.deviceinfo.name : '',
                    })(
                        <Input placeholder='设备名称' />
                    )}
                    </Item>
                    <Item label="运行系统">
                    {getFieldDecorator('runos',{
                        initialValue:isUpdate ? deviceinfo.deviceinfo.runos : '2',
                    })(
                        <Select>
                        {
                            deviceRunSystem.map(item=><Option key={item.value} value={item.value}>{item.label}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
                    <Item label="安装地点">
                    {getFieldDecorator('installlocation',{
                        initialValue:isUpdate ? deviceinfo.deviceinfo.installlocation._id : 1,
                        rules:[
                        {
                            required:true,message:'安装地点不能为空!'
                        }
                        ]
                    })(
                        <Select>
                            {
                                installlocations.map(ps=><Option key={ps._id} value={ps._id}>{ps.name}</Option>)
                            }
                        </Select>
                    )}
                    </Item>
                    <Item label="设备IP">
                    {getFieldDecorator('ip',{
                        initialValue:isUpdate ? deviceinfo.deviceinfo.ip : '',
                    })(
                        <Input placeholder='多个ip用/隔开' />
                    )}
                    </Item>
                    <Item label="设备MAC">
                    {getFieldDecorator('mac',{
                        initialValue:isUpdate ? deviceinfo.deviceinfo.mac : '',
                    })(
                        <Input placeholder='多个mac用/隔开' />
                    )}
                    </Item>
                    <Item label="安装时间">
                    {getFieldDecorator('installdate',{
                        initialValue:isUpdate ? moment(deviceinfo.deviceinfo.installdate,'YYYY-MM-DD') : moment(thisDate,'YYYY-MM-DD'),
                        rules:[
                        {
                            required:true,message:'安装时间不能为空!'
                        }
                        ]
                    })(
                        <DatePicker/>
                    )}
                    </Item>
                    <Item label="设备状态">
                    {getFieldDecorator('status',{
                        initialValue:isUpdate ? deviceinfo.deviceinfo.status : '1',
                        rules:[
                        {
                            required:true,message:'设备状态不能为空!'
                        }
                        ]
                    })(
                        <Select>
                        {
                            deviceStatus.map(item=><Option key={item.value} value={item.value}>{item.label}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
                    <Item label="备注">
                    {getFieldDecorator('remarks',{
                        initialValue:isUpdate ? deviceinfo.deviceinfo.remarks : ''
                    })(
                        <TextArea placeholder='' autoSize={{minRows:2}}/>
                    )}
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}><Icon type="save"/>提交</Button>&nbsp;&nbsp;
                        <Button type='danger' onClick={()=>this.props.history.goBack()}><Icon type="close" />取消</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

const mapStateToProps = state => {
    return {
        devicecategoryReducer:state.devicecategoryReducer,
        departmentReducer:state.departmentReducer,
        userReducer:state.userReducer,
        problemCategoryReducer:state.problemCategoryReducer,
        installlocationReducer:state.installlocationReducer,
        deviceinfoReducer:state.deviceinfoReducer,
        devicemodelReducer:state.devicemodelReducer
    }
}

const mapDispatchToProps = {rDcs,rDms,rIls,rDis,couDi}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create()(AddOrUpdate))