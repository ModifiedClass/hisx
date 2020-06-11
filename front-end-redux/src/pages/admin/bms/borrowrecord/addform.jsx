import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,Input,DatePicker,Select} from 'antd'
import {shortDate} from '../../../../utils/dateUtils'
import {rBooks} from '../../../../api'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const Item=Form.Item
const {Option}=Select
const thisDate=shortDate(Date.now())

class AddForm extends Component{

    state={
        books:[],
    }
    
    static propTypes={
        setForm:PropTypes.func.isRequired,
        borrowrecord:PropTypes.object
    }
    
    getBC=async value =>{
        this.setState({books:[]})
        const result=await rBooks({'bookcategory':value})
        if(result.status===1){
            this.setState({books:result.data})
        }  
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {borrowrecord,bookcategorys}=this.props
        const {books}=this.state
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:16}
        }
        return(
            <Form {...formItemLayout}>
                <Item label="借阅时间">
                    {getFieldDecorator('create_time',{
                        initialValue: borrowrecord.create_time?moment(borrowrecord.create_time,'YYYY-MM-DD'):moment(thisDate,'YYYY-MM-DD'),
                        rules:[
                        {
                            required:true,message:'借阅时间!'
                        }
                        ]
                    })(
                        <DatePicker/>
                    )}
                </Item>
                <Item label="图书类别">
                    {getFieldDecorator('bookcategory',{
                        rules:[
                        {
                            required:true,message:'图类别不能为空!'
                        }
                        ]
                    })(
                        <Select onChange={this.getBC}>
                        {
                            bookcategorys.map(pc=><Option key={pc._id} value={pc._id}>{pc.name}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
                <Item label='图书' {...formItemLayout}>
                {
                    getFieldDecorator('book',{
                        rules:[
                        {required:true,message:'图书不能为空!'}
                        ]
                    })(
                        <Select >
                        {
                            books.map(pc=><Option key={pc._id} value={pc._id}>{pc.name}</Option>)
                        }
                        </Select>
                    )
                }
                </Item>
                <Item label='借阅人' {...formItemLayout}>
                {
                    getFieldDecorator('reader',{
                        initialValue:borrowrecord.details,
                        rules:[
                        {required:false}
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