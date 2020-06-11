import React,{Component} from 'react';
import { Form, Icon, Input, Button,message } from 'antd';
import {Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {login} from '../../redux/actions/account'
import {SITENAME} from '../../utils/constants'

import './index.less'

class Login extends Component {
    handleSubmit=e=> {
        e.preventDefault();
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
                const{username,password}=values
                //调用分发异步actions函数
                this.props.login(username,password)
                //this.props.history.replace('/')
            }else{
                message.error('校验失败!')
                //
            }
            this.props.history.replace('/')
        });
    }
    validatePwd=(rule,value,callback)=>{
        if(!value){
            callback('密码不能为空！')
        }else if(value.length<6){
            callback('密码不能小于6位！')
        }else if(value.length>20){
            callback('密码不能大于20位！')
        }/*else if(/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须为英文数字下划线组成！')
        }*/else{
            callback()
        }
    }
    render(){
        const user=this.props.user
        if(user && user._id){
            return <Redirect to='/'/>
        }
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="login">
                <section className="login-content">
                    <h2>{SITENAME}</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                        {getFieldDecorator('username', {
                        rules: [{ required: true, message: '用户名不能为空!' },
                            { min: 3, message: '用户名不少于3位!' },
                            { max: 20, message: '用户名不大于20位!' }],initialValue:'U095'
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="用户名" />
                        )}
                        </Form.Item>
                        <Form.Item>
                        {getFieldDecorator('password', {
                        rules: [{ validator:this.validatePwd }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"
                            placeholder="密码" />
                        )}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}
const WarpLogin=Form.create({ name: 'login'})(Login)
export default connect(
    state=>({user:state.user}),
    {login}
)(WarpLogin)
