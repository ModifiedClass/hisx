import React,{PureComponent} from 'react';
import PropTypes from 'prop-types'

import {Form,Input,Select} from 'antd'

const Item=Form.Item
const Option=Select.Option

class AddForm extends PureComponent{
    
    static propTypes={
        setForm:PropTypes.func.isRequired,
        departments:PropTypes.array.isRequired,
        department:PropTypes.object
    }
    
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {departments,department}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <Form>
                <Item label='部门名称' {...formItemLayout}>
                {
                    getFieldDecorator('name',{
                        initialValue:department.name,
                        rules:[
                        {required:true,message:'部门名称不能为空!'}
                        ]
                    })(
                        <Input placeholder='请输入部门名称名!'/>
                    )
                }
                </Item>
                <Item label='简码' {...formItemLayout}>
                    {
                    getFieldDecorator('code',{
                        initialValue:department.code,
                        rules:[
                        {required:true,message:'简码不能为空!'}
                        ]
                    })(
                        <Input placeholder='请输入简码!'/>
                    )
                    }
                </Item>
                
                <Item label='上级部门' {...formItemLayout}>
                {
                    getFieldDecorator('parent_id',{
                        initialValue:department.parent_id,
                    })(
                        <Select>
                        {
                            departments.map(department=><Option key={department._id} value={department._id}>{department.name}</Option>)
                        }
                        </Select>
                    )
                }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)