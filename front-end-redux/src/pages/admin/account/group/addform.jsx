import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,Input} from 'antd'

const Item=Form.Item

class AddForm extends Component{
    
    static propTypes={
        setForm:PropTypes.func.isRequired,
        group:PropTypes.object
    }
    
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {group}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <Form>
                <Item label='组名称' {...formItemLayout}>
                {
                    getFieldDecorator('name',{
                        initialValue:group.name,
                        rules:[
                        {required:true,message:'组名称不能为空!'}
                        ]
                    })(
                        <Input placeholder='请输入组名称!'/>
                    )
                }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)