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
        bookstock:PropTypes.object
    }
    
    getBooksList=async value =>{
        this.setState({books:[]})
        const result=await rBooks({'bookcategory':value})
        if(result.status===1){
            this.setState({books:result.data.list})
        }  
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {bookstock,bookcategorys}=this.props
        const {books}=this.state
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:16}
        }
        return(
            <Form {...formItemLayout}>
                <Item label="入库时间">
                    {getFieldDecorator('create_time',{
                        initialValue: bookstock.create_time?moment(bookstock.create_time,'YYYY-MM-DD'):moment(thisDate,'YYYY-MM-DD'),
                        rules:[
                        {
                            required:true,message:'入库时间!'
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
                        <Select onChange={this.getBooksList}>
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
                            books.map(pc=><Option key={pc._id} value={pc._id}>{pc.name}-{pc.publisheryear}</Option>)
                        }
                        </Select>
                    )
                }
                </Item>
                <Item label='数量' {...formItemLayout}>
                {
                    getFieldDecorator('nums',{
                        initialValue:bookstock.details,
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