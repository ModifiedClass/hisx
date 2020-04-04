import React,{PureComponent} from 'react';
import PropTypes from 'prop-types'

import {Form,Input,Select,Switch} from 'antd'

const Item=Form.Item
const Option=Select.Option

class AddForm extends PureComponent{
    
    static propTypes={
        setForm:PropTypes.func.isRequired,
        groups:PropTypes.array.isRequired,
        user:PropTypes.object
    }
    
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {groups,user}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <Form>
                <Item label='用户名' {...formItemLayout}>
                {
                    getFieldDecorator('username',{
                        initialValue:user.username,
                        rules:[
                        {required:true,message:'用户名不能为空!'}
                        ]
                    })(
                        user.username==='admin'?<Input disabled/>:<Input placeholder='请输入用户名!'/>
                    )
                }
                </Item>
                {user._id ? null:(
                    <Item label='密码' {...formItemLayout}>
                    {
                    getFieldDecorator('password',{
                        initialValue:user.password,
                        rules:[
                        {required:true,message:'密码不能为空!'}
                        ]
                    })(
                        <Input placeholder='请输入密码!' type="password"/>
                    )
                    }
                </Item>
                )}
                <Item label='姓名' {...formItemLayout}>
                {
                    getFieldDecorator('name',{
                        initialValue:user.name,
                        rules:[
                        {required:true,message:'姓名不能为空!'}
                        ]
                    })(
                        <Input placeholder='请输入姓名!'/>
                    )
                }
                </Item>
                <Item label='用户组' {...formItemLayout}>
                {
                    getFieldDecorator('group',{
                        initialValue:user.group,
                        rules:[
                        {required:true,message:'请选择用户组!'}
                        ]
                    })(
                        <Select mode='multiple'>
                        {
                            groups.map(group=><Option key={group._id} value={group._id}>{group.name}</Option>)
                        }
                        </Select>
                    )
                }
                </Item>
                <Item label='超级用户' {...formItemLayout}>
                    {
                    getFieldDecorator('issuper', { 
                        valuePropName: 'checked',
                        initialValue:user.isSuper?user.isSuper:false
                    })(
                        <Switch />
                    )}
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)