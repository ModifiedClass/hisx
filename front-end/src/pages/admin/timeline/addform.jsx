import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,Input,DatePicker} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Item=Form.Item
const {TextArea}=Input

class AddForm extends Component{
    
    static propTypes={
        setForm:PropTypes.func.isRequired,
        timeline:PropTypes.object
    }
    
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {timeline}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:16}
        }
        return(
            <Form>
                <Item label="时间">
                    {getFieldDecorator('create_time',{
                        initialValue: moment(timeline.create_time,'YYYY-MM-DD'),
                        rules:[
                        {
                            required:true,message:'时间不能为空!'
                        }
                        ]
                    })(
                        <DatePicker/>
                    )}
                </Item>
                <Item label='时间轴内容' {...formItemLayout}>
                {
                    getFieldDecorator('name',{
                        initialValue:timeline.name,
                        rules:[
                        {required:true,message:'时间轴内容不能为空!'}
                        ]
                    })(
                        <TextArea placeholder='' autoSize={{minRows:2,maxRows:6}}/>
                    )
                }
                </Item>
                <Item label='时间轴详情' {...formItemLayout}>
                {
                    getFieldDecorator('details',{
                        initialValue:timeline.details,
                        rules:[
                        {required:false}
                        ]
                    })(
                        <TextArea placeholder='' autoSize={{minRows:2,maxRows:6}}/>
                    )
                }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)