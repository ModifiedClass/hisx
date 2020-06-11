import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,Input,Select} from 'antd'

const Item=Form.Item
const Option=Select.Option

class AddForm extends Component{
    
    static propTypes={
        setForm:PropTypes.func.isRequired,
        devicemodel:PropTypes.object
    }
    
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {devicemodel,devicecategorys}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <Form>
                <Item label='设备类别' {...formItemLayout}>
                    {
                    getFieldDecorator('devicecategory',{
                        initialValue:devicemodel.devicecategory,
                        rules:[
                        {required:true,message:'类别不能为空!'}
                        ]
                    })(
                        <Select>
                        {
                            devicecategorys.map(devicecategory=><Option key={devicecategory._id} value={devicecategory._id}>{devicecategory.name}</Option>)
                        }
                        </Select>
                    )}
                </Item>
                <Item label='型号名称' {...formItemLayout}>
                {
                    getFieldDecorator('name',{
                        initialValue:devicemodel.name,
                        rules:[
                        {required:true,message:'型号名称不能为空!'}
                        ]
                    })(
                        <Input placeholder='请输入型号名称!'/>
                    )
                }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)