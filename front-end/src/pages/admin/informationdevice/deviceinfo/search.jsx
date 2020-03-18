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

const Option=Select.Option
const Item=Form.Item

class Search extends PureComponent{
    static propTypes={
        setForm:PropTypes.func.isRequired,
    }
    getSearchItem=()=>{
        return this.props.form.getFieldsValue()
    }
    render(){
        
        return(
            <Form className="ant-advanced-search-form" >
                <Row gutter={24}>
                    <Col span={8}>
                        <Item label="类别">
                            <Select>
                                {
                                    deviceRunSystem.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label="型号">
                            <Select>
                                {
                                    deviceRunSystem.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label="位置">
                            <Select>
                                {
                                    deviceRunSystem.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label="系统">
                            <Select>
                                {
                                    deviceRunSystem.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label='名称' >
                            <Input placeholder='请输入类别名称!'/>
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label={'ip'} >
                            <Input placeholder="placeholder" />
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label={'mac'} >
                            <Input placeholder="placeholder" />
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item label="状态">
                            <Select>
                                {
                                    deviceStatus.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                                }
                            </Select>
                        </Item>
                    </Col>
                    <Col span={8}>
                        <Item style={{float:'right'}}>
                            <span>
                                <Button style={{marginBottom:10}} type='primary' onClick={this.props.Searchdevs}>搜索<Icon type='search'/></Button>
                                <Button style={{ marginLeft: 8 }} type="button" onClick={()=>{this.form.resetFields()}}><Icon type='reload'/>重置</Button>
                            </span>
                        </Item>
                    </Col>
                </Row>
            </Form>
        )
    }
}
export default Form.create()(Search)