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
    DatePicker
    } from 'antd'

import {rUsers} from '../../../../api'

const Option=Select.Option
const Item=Form.Item
const { RangePicker } = DatePicker

class SearchForm extends PureComponent{

    state={
        users:[],
        bstartdate:'',
        benddate:'',
        rstartdate:'',
        renddate:'',
    }

    static propTypes={
        setForm:PropTypes.func.isRequired
    }
    onReset=()=>{
        this.props.form.resetFields()
        this.setState({
            bstartdate:'',
            benddate:'',
            rstartdate:'',
            renddate:'',
        })
    }

    getFormItem=()=>{
        this.props.form.validateFields((err,values)=>{
            this.props.setSearchItem({
                book:values.book,
                reader:values.reader,
                status:values.status,
                bstartdate:this.state.bstartdate,
                benddate:this.state.benddate,
                rstartdate:this.state.rstartdate,
                renddate:this.state.renddate
            })
        })
        
    }

    bdataonChange=(date, dateString)=>{
        const bstartdate=dateString[0]
        const benddate=dateString[1]
        this.setState({bstartdate,benddate})
    }

    rdataonChange=(date, dateString)=>{
        const rstartdate=dateString[0]
        const renddate=dateString[1]
        this.setState({rstartdate,renddate})
    }

    handleSearchUsers=async value =>{
        if(value){
            const result1=await rUsers({'username':value})
            const result2=await rUsers({'name':value})
            if(result1.status===1){
                const users=result1.data
                this.setState({users})            
            }else if(result2.status===1){
                const users=result2.data
                this.setState({users}) 
            }else{
                this.setState({users:[]}) 
            }
        }else{
            this.setState({users:[]})
        }
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {getFieldDecorator}=this.props.form
        const bookStatus=[{'value':0,'label':'未归还'},{'value':1,'label':'已归还'}]
        const useroptions = this.state.users.map(d => <Option key={d._id} >{d.username}-{d.name}</Option>)
        return(
            <Form className="ant-advanced-search-form" >
                <Row gutter={24}>
                    <Col span={8}>
                        <Item label='借阅时间' >
                        {
                        getFieldDecorator('create_time',{
                        initialValue:''})
                            (
                                <RangePicker onChange={this.bdataonChange} />
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
                                <RangePicker onChange={this.rdataonChange} />
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
                        <Item label='借阅人' >
                        {
                        getFieldDecorator('reader',{
                        initialValue:''})
                            (
                                <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="选择借阅人"
                                showArrow={false}
                                filterOption={false}
                                onSearch={this.handleSearchUsers}
                                notFoundContent={null}
                            >
                            {useroptions}
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