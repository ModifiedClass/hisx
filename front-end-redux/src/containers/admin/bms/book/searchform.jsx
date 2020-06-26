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

import {rBookCategorys} from '../../../../api'

const Option=Select.Option
const Item=Form.Item

class SearchForm extends PureComponent{
    state={
        bookcategorys:[],
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
    initSelect=async()=>{
        const bookcategorys=await rBookCategorys()
        if(bookcategorys.status===1){
            this.setState({bookcategorys:bookcategorys.data})
        }
    }

    componentWillMount(){
        this.initSelect()
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {getFieldDecorator}=this.props.form
        const {bookcategorys} =this.state

        return(
            <Form className="ant-advanced-search-form" >
                <Row gutter={24}>
                    <Col span={8}>
                        <Item label="类别">
                        {
                        getFieldDecorator('bookcategory',{
                        initialValue:''})
                        (
                            <Select >
                                {
                                    bookcategorys.map(ps=><Option key={ps._id} value={ps._id}>{ps.name}</Option>)
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
                        <Item label='作者' >
                        {
                        getFieldDecorator('author',{
                        initialValue:''})
                            (
                            <Input />
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label='出版社' >
                        {
                        getFieldDecorator('publisher',{
                        initialValue:''})
                            (
                            <Input />
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label='出版时间' >
                        {
                        getFieldDecorator('publisheryear',{
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