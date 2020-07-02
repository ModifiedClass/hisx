import React,{PureComponent} from 'react';
import PropTypes from 'prop-types'

import {Form,Input,Select} from 'antd'
import {appFrameWork,dataBase} from '../../../../config/selectConfig'

const Item=Form.Item
const {TextArea}=Input
const Option=Select.Option

class AddForm extends PureComponent{
    
    static propTypes={
        setForm:PropTypes.func.isRequired,
        applicationsoftware:PropTypes.object
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {applicationsoftware,deviceinfos}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <Form>
                <Item label='应用名称' {...formItemLayout}>
                {
                    getFieldDecorator('name',{
                        initialValue:applicationsoftware.name,
                        rules:[
                        {required:true,message:'应用名称不能为空!'}
                        ]
                    })(
                        <Input placeholder='请输入应用名称名!'/>
                    )
                }
                </Item>
                <Item label='架构' {...formItemLayout}>
                {
                    getFieldDecorator('framework',{
                        initialValue:applicationsoftware.framework,
                    })(
                        <Select>
                        {
                            appFrameWork.map(item=><Option key={item.value} value={item.value}>{item.label}</Option>)
                        }
                        </Select>
                    )
                }
                </Item>
                <Item label='数据库' {...formItemLayout}>
                {
                    getFieldDecorator('database',{
                        initialValue:applicationsoftware.database,
                    })(
                        <Select>
                        {
                            dataBase.map(item=><Option key={item.value} value={item.value}>{item.label}</Option>)
                        }
                        </Select>
                    )
                }
                </Item>
                <Item label='安装设备' {...formItemLayout}>
                {
                    getFieldDecorator('device',{
                        initialValue:applicationsoftware.device,
                    })(
                        <Select>
                        {
                            deviceinfos.map(item=><Option key={item._id} value={item._id}>{'名称:'+item.name+' ip:'+item.ip}</Option>)
                        }
                        </Select>
                    )
                }
                </Item>
                <Item label='部署方法' {...formItemLayout}>
                {
                    getFieldDecorator('deployment',{
                        initialValue:applicationsoftware.deployment,
                    })(
                        <TextArea placeholder='' autoSize={{minRows:2,maxRows:6}}/>
                    )
                }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)