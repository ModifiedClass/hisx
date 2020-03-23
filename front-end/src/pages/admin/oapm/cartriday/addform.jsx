import React,{PureComponent} from 'react';
import PropTypes from 'prop-types'

import {Form,Input} from 'antd'

const Item=Form.Item

class AddForm extends PureComponent{

    static propTypes={
        setForm:PropTypes.func.isRequired,
        cartriday:PropTypes.object
    }
    
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {cartriday,users}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <Form>
                <Item label='处理人员' {...formItemLayout}>
                {
                    getFieldDecorator('_handler',{
                        rules:[
                        {required:true,message:'处理人员不能为空!'}
                        ]
                    })(
                        <Select>
                        {
                            users.map(item=><Option key={item._id} value={item._id}>{item.name}</Option>)
                        }
                        </Select>
                    )
                }
                </Item>
                <Item label='数量' {...formItemLayout}>
                {
                    getFieldDecorator('nums',{
                        initialValue:0,
                        rules:[
                        {required:true,message:'数量不能为空!'}
                        ]
                    })(
                        <Input />
                    )
                }
                </Item>   
            </Form>
        )
    }
}
export default Form.create()(AddForm)