import React,{Component} from 'react';

import {Card,Form,Input,Select,Cascader,Button,Icon,DatePicker} from 'antd'
import BackBtn from '../../../../components/backbtn'

import reqCascaderDepartments from '../../../../api/json/cascaderdepartment.js'
import {shortDate} from '../../../../utils/dateUtils'
import {deviceRunSystem,deviceStatus} from '../../../../config/selectConfig'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

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

    getDeviceCategorys=async ()=>{
        const result=reqCascaderDepartments
        if(result.status==='1'){
            this.setState({devicecategorys:result.data})            
        }
    }
    getDeviceModels=async (dcid)=>{
        const result=reqCascaderDepartments
        if(result.status==='1'){
            this.setState({devicemodels:result.data})            
        } 
    }
    getParents=async ()=>{
        const result=reqCascaderDepartments
        if(result.status==='1'){
            this.setState({parents:result.data})            
        }  
    }
    getInstallLocations=async ()=>{
        const result=reqCascaderDepartments
        if(result.status==='1'){
            this.setState({installlocations:result.data})            
        }
    }
    
    submit=()=>{
        this.props.form.validateFields((error,values)=>{
            if(!error){
                console.log(values)
            }
        })
    }
    
    componentDidMount(){
        this.getDeviceCategorys()
        this.getDeviceModels('0')
        this.getParents()
        this.getInstallLocations()
    }
    
    componentWillMount(){
        const deviceinfo=this.props.location.state
        this.isUpdate=!!deviceinfo
        //{}空对象 避免undifine
        this.deviceinfo=deviceinfo ||{}
    }
    render(){
        const {isUpdate,deviceinfo}=this
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
                    <Item label="设备类别">
                    {getFieldDecorator('devicecategory',{
                        initialValue:isUpdate ? deviceinfo.devicecategory :'1',
                        rules:[
                        {
                            required:true,message:'设备类别不能为空!'
                        }
                        ]
                    })(
                        <Select onChange={value=>this.getDeviceModels(value)}>
                        {
                            this.state.devicecategorys.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
                    <Item label="设备型号">
                    {getFieldDecorator('devicemodel',{
                        initialValue:isUpdate ? deviceinfo.devicemodel :'1',
                    })(
                        <Select>
                        {
                            this.state.devicemodels.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
                    <Item label="序列号">
                    {getFieldDecorator('sn',{
                        initialValue:isUpdate ? deviceinfo.sn : '',
                    })(
                        <Input placeholder='序列号' />
                    )}
                    </Item>
                    <Item label="设备名称">
                    {getFieldDecorator('name',{
                        initialValue:isUpdate ? deviceinfo.name : '',
                    })(
                        <Input placeholder='设备名称' />
                    )}
                    </Item>
                    <Item label="运行系统">
                    {getFieldDecorator('runos',{
                        initialValue:isUpdate ? deviceinfo.runos : '2',
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
                        initialValue:isUpdate ? deviceinfo.installlocation : '1',
                        rules:[
                        {
                            required:true,message:'安装地点不能为空!'
                        }
                        ]
                    })(
                        <Select>
                        {
                            this.state.installlocations.map(item=><Option key={item._id} value={item._id}>{item.name}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
                    <Item label="设备IP">
                    {getFieldDecorator('ip',{
                        initialValue:isUpdate ? deviceinfo.ip : '',
                    })(
                        <Input placeholder='多个ip用/隔开' />
                    )}
                    </Item>
                    <Item label="设备MAC">
                    {getFieldDecorator('mac',{
                        initialValue:isUpdate ? deviceinfo.mac : '',
                    })(
                        <Input placeholder='多个mac用/隔开' />
                    )}
                    </Item>
                    <Item label="安装时间">
                    {getFieldDecorator('create_time',{
                        initialValue:isUpdate ? moment(deviceinfo.create_time,'YYYY-MM-DD') : moment(thisDate,'YYYY-MM-DD'),
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
                        initialValue:isUpdate ? deviceinfo.status : '1',
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
                    <Item>
                        <Button type='primary'><Icon type="save" onClick={this.submit}/>提交</Button>&nbsp;&nbsp;
                        <Button type='danger'><Icon type="close" />取消</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
export default Form.create()(AddOrUpdate)