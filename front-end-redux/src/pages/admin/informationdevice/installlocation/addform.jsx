import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,Input} from 'antd'

const Item=Form.Item

class AddForm extends Component{
    
    static propTypes={
        setForm:PropTypes.func.isRequired,
        installlocation:PropTypes.object
    }
    
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {installlocation}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <Form>
                <Item label='地点名称' {...formItemLayout}>
                {
                    getFieldDecorator('name',{
                        initialValue:installlocation.name,
                        rules:[
                        {required:true,message:'地点名称不能为空!'}
                        ]
                    })(
                        <Input placeholder='请输入地点名称!'/>
                    )
                }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)