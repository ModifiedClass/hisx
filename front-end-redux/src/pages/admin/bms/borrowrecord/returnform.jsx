import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,Input} from 'antd'
import {shortDate} from '../../../../utils/dateUtils'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const Item=Form.Item


class ReturnForm extends Component{

    static propTypes={
        setForm:PropTypes.func.isRequired,
        borrowrecord:PropTypes.object
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {borrowrecord}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:16}
        }
        return(
            <Form {...formItemLayout}>
                <Item label="借阅时间">
                    {getFieldDecorator('create_time',{
                        initialValue: shortDate(borrowrecord.create_time),
                        rules:[
                        {
                            required:false
                        }
                        ]
                    })(
                        <Input disabled/>
                    )}
                </Item>
                <Item label='图书' {...formItemLayout}>
                {
                    getFieldDecorator('book',{
                        initialValue:borrowrecord.book.name,
                        rules:[
                        {required:false}
                        ]
                    })(
                        <Input disabled/>
                    )
                }
                </Item>
                <Item label='借阅人' {...formItemLayout}>
                {
                    getFieldDecorator('reader',{
                        initialValue:borrowrecord.reader.name,
                        rules:[
                        {required:false}
                        ]
                    })(
                        <Input disabled/>
                    )
                }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(ReturnForm)