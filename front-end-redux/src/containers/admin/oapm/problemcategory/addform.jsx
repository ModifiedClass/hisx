import React,{PureComponent} from 'react';
import PropTypes from 'prop-types'

import {Form,Input} from 'antd'

const Item=Form.Item

class AddForm extends PureComponent{
    
    static propTypes={
        setForm:PropTypes.func.isRequired,
        problemcategory:PropTypes.object
    }
    
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {problemcategory}=this.props
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
                        initialValue:problemcategory.name,
                        rules:[
                        {required:true,message:'类别名称不能为空!'}
                        ]
                    })(
                        <Input placeholder='请输入类别名称名!'/>
                    )
                }
                </Item>                
            </Form>
        )
    }
}
export default Form.create()(AddForm)