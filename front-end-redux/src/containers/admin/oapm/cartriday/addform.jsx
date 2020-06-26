import React,{PureComponent} from 'react';
import PropTypes from 'prop-types'

import {Form,Input,Select,DatePicker} from 'antd'
import {shortDate} from '../../../../utils/dateUtils'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const Item=Form.Item
const Option=Select.Option
const thisDate=shortDate(Date.now())

class AddForm extends PureComponent{

    static propTypes={
        setForm:PropTypes.func.isRequired,
        cartriday:PropTypes.object,
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
            <Form {...formItemLayout}>
                <Item label="记录时间">
                    {getFieldDecorator('create_time',{
                        initialValue:cartriday.create_time ? moment(cartriday.create_time,'YYYY-MM-DD') : moment(thisDate,'YYYY-MM-DD'),
                        rules:[
                        {
                            required:true,message:'记录时间不能为空!'
                        }
                        ]
                    })(
                        <DatePicker/>
                    )}
                    </Item>
                <Item label='处理人员' >
                {
                    getFieldDecorator('_handler',{
                        initialValue:cartriday._handler,
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
                <Item label='数量' >
                {
                    getFieldDecorator('nums',{
                        initialValue:cartriday.nums?cartriday.nums:0,
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