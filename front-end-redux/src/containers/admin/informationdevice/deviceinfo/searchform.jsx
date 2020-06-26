import React,{PureComponent} from 'react';
import PropTypes from 'prop-types'
import {
    Form, 
    Row, 
    Col,
    Select,
    Input,
    Button,
    Icon,
    } from 'antd'

import {deviceRunSystem,deviceStatus} from '../../../../config/selectConfig'
import {rDeviceCategorys,rDeviceModels,rInstallLocations} from '../../../../api'

const Option=Select.Option
const Item=Form.Item

class SearchForm extends PureComponent{
    state={
        devicecategorys:[],
        devicemodels:[],
        installlocations:[]
    }
    static propTypes={
        setForm:PropTypes.func.isRequired
    }
    onReset=()=>{
        this.props.form.resetFields()
    }
    getFormItem=()=>{
        this.props.form.validateFields((err,values)=>{
            this.props.setSearchItem(values)
        })
        
    }
    
    getDM=async value =>{
        this.setState({devicemodels:[]})
        const result=await rDeviceModels({'devicecategory':value})
        console.log(result.data)
        if(result.status===1){
            this.setState({devicemodels:result.data})
        }  
    }
    
    initSelect=async()=>{
        const devicecategorys=await rDeviceCategorys()
        if(devicecategorys.status===1){
            this.setState({devicecategorys:devicecategorys.data})
        }
        const installlocations=await rInstallLocations()
        if(installlocations.status===1){
            this.setState({installlocations:installlocations.data})
        }
    }
    
    componentWillMount(){
        this.initSelect()
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {getFieldDecorator}=this.props.form
        const {devicecategorys,devicemodels,installlocations} =this.state

        return(
            <Form className="ant-advanced-search-form" >
                <Row gutter={24}>
                    <Col span={8}>
                        <Item label="类别">
                        {
                        getFieldDecorator('devicecategory',{
                        initialValue:''})
                        (
                            <Select onChange={this.getDM}>
                                {
                                    devicecategorys.map(ps=><Option key={ps._id} value={ps._id}>{ps.name}</Option>)
                                }
                            </Select>
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label="型号">
                        {
                        getFieldDecorator('devicemodel',{
                        initialValue:''})
                        (
                            <Select>
                                {
                                    devicemodels.map(ps=><Option key={ps._id} value={ps._id}>{ps.name}</Option>)
                                }
                            </Select>
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label="位置">
                        {
                        getFieldDecorator('installlocation',{
                        initialValue:''})
                        (
                            <Select>
                                {
                                    installlocations.map(ps=><Option key={ps._id} value={ps._id}>{ps.name}</Option>)
                                }
                            </Select>
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label="系统">
                        {
                        getFieldDecorator('runos',{
                        initialValue:''})
                        (
                            <Select>
                                {
                                    deviceRunSystem.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label='名称' >
                        {
                        getFieldDecorator('name',{
                        initialValue:''})
                            (
                            <Input />
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label={'ip'} >
                        {
                        getFieldDecorator('ip',{
                        initialValue:''})
                        (
                            <Input/>
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label={'mac'} >
                        {
                        getFieldDecorator('mac',{
                        initialValue:''})
                        (
                            <Input/>
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label="状态">
                        {
                        getFieldDecorator('status',{
                        initialValue:''})
                        (
                            <Select>
                                {
                                    deviceStatus.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item style={{float:'right'}}>
                            <span>
                                <Button style={{marginBottom:10}} type='primary' onClick={this.getFormItem}>搜索<Icon type='search'/></Button>
                                <Button style={{ marginLeft: 8 }} type="button" onClick={this.onReset}><Icon type='reload'/>重置</Button>
                            </span>
                        </Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}
export default Form.create()(SearchForm)