import React,{Component} from 'react';
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

import {problemState} from '../../../../config/selectConfig'

const Option=Select.Option
const Item=Form.Item

class Search extends Component{
    static propTypes={
        setForm:PropTypes.func.isRequired,
    }
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render(){
        
        return(
            <Form className="ant-advanced-search-form" >
                <Row gutter={24}>
                    <Col span={6}>
                        <Item label="类别">
                            <Select>
                                {
                                    problemState.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label="型号">
                            <Select>
                                {
                                    problemState.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label="位置">
                            <Select>
                                {
                                    problemState.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label="系统">
                            <Select>
                                {
                                    problemState.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label='名称' >
                            <Input placeholder='请输入类别名称!'/>
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label={'ip'} >
                            <Input placeholder="placeholder" />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label={'mac'} >
                            <Input placeholder="placeholder" />
                        </Item>
                    </Col>
                    <Col span={6}>
                        <Item label="状态">
                            <Select>
                                {
                                    problemState.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                        </Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}
export default Form.create()(Search)