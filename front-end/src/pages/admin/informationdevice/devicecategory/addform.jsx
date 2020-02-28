import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,Input} from 'antd'

const Item=Form.Item

class AddForm extends Component{
    
    static propTypes={
        setForm:PropTypes.func.isRequired,
        devicecategory:PropTypes.object
    }
    
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {devicecategory}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <Form>
                <Item label='类别名称' {...formItemLayout}>
                {
                    getFieldDecorator('name',{
                        initialValue:devicecategory.name,
                        rules:[
                        {required:true,message:'类别名称不能为空!'}
                        ]
                    })(
                        <Input placeholder='请输入类别名称!'/>
                    )
                }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)