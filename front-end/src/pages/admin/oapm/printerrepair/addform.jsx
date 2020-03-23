import React,{PureComponent} from 'react';
import PropTypes from 'prop-types'

import {Form,Input} from 'antd'

const Item=Form.Item

class AddForm extends PureComponent{

    static propTypes={
        setForm:PropTypes.func.isRequired,
        printerrepair:PropTypes.object
    }
    
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {printerrepair,users}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <Form>
                <Item label="部门">
                    {getFieldDecorator('department',{
                        initialValue:['2','21','211'],
                        rules:[
                        {
                            required:true,message:'部门不能为空!'
                        }
                        ]
                    })(
                        <Cascader 
                        options={this.state.options}
                        placeholder="请选择部门!"
                        />
                    )}
                    </Item>
                <Item label='打印机' {...formItemLayout}>
                {
                    getFieldDecorator('_handler',{
                        rules:[
                        {required:true,message:'打印机不能为空!'}
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
                <Item label="处理时间">
                    {getFieldDecorator('create_time',{
                        initialValue:isUpdate ? moment(create_time,'YYYY-MM-DD') : moment(thisDate,'YYYY-MM-DD'),
                        rules:[
                        {
                            required:true,message:'处理时间不能为空!'
                        }
                        ]
                    })(
                        <DatePicker/>
                    )}
                </Item>
                <Item label="处理人员">
                    {getFieldDecorator('discoverer',{
                        initialValue:isUpdate ? processedrecord.discoverer : '2',
                        rules:[
                        {
                            required:true,message:'处理人员不能为空!'
                        }
                        ]
                    })(
                        <Select>
                        {
                            reqUsers.data.users.map(ru=><Option key={ru._id} value={ru._id}>{ru.username}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)