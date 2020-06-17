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


const Option=Select.Option
const Item=Form.Item

class SearchForm extends PureComponent{

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
    
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {getFieldDecorator}=this.props.form
        const bookStatus=[{'value':0,'label':'未归还'},{'value':1,'label':'已归还'}]
        return(
            <Form className="ant-advanced-search-form" >
                <Row gutter={24}>
                    <Col span={8}>
                        <Item label="归还状态">
                        {
                        getFieldDecorator('status',{
                        initialValue:''})
                        (
                            <Select >
                                {
                                    bookStatus.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label='书名' >
                        {
                        getFieldDecorator('book',{
                        initialValue:''})
                            (
                            <Input />
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label='借阅时间' >
                        {
                        getFieldDecorator('create_time',{
                        initialValue:''})
                            (
                            <Input />
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label='归还时间' >
                        {
                        getFieldDecorator('return_time',{
                        initialValue:''})
                            (
                            <Input />
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label='借阅人' >
                        {
                        getFieldDecorator('reader',{
                        initialValue:''})
                            (
                            <Input />
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