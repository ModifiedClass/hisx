import React,{PureComponent} from 'react';
import PropTypes from 'prop-types'
import {
    Form, 
    Row, 
    Col,
    Input,
    Button,
    Icon,
    DatePicker
    } from 'antd'


const Item=Form.Item
const { RangePicker } = DatePicker

class SearchForm extends PureComponent{

    state={
        startdate:'',
        enddate:'',
    }

    static propTypes={
        setForm:PropTypes.func.isRequired
    }
    onReset=()=>{
        this.props.form.resetFields()
    }

    getFormItem=()=>{
        this.props.form.validateFields((err,values)=>{
            console.log(values.book)
            this.props.setSearchItem({
                book:values.book,
                startdate:this.state.startdate,
                enddate:this.state.enddate
            })
        })
        
    }

    dataonChange=(date, dateString)=>{
        const startdate=dateString[0]
        const enddate=dateString[1]
        this.setState({startdate,enddate})
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {getFieldDecorator}=this.props.form

        return(
            <Form className="ant-advanced-search-form" >
                <Row gutter={24}>
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
                    <Col span={10}>
                        <Item label='入库时间' >
                        {
                        getFieldDecorator('publisheryear',{
                        initialValue:''})
                            (
                                <RangePicker onChange={this.dataonChange} />
                            )
                        }
                        </Item>
                    </Col>
                    <Col span={6}>
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