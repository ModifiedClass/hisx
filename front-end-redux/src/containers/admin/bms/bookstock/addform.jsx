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
    
    handleSearchBooks=async value =>{
        if(value){
            const result=await rBooks({'name':value})
            if(result.status===1){
                const books=result.data.list
                this.setState({books})            
            }else{
                this.setState({books:[]})
            }
        }else{
            this.setState({books:[]})
        }
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {bookstock}=this.props
        const {books}=this.state
        const bookoptions = books.map(d => <Option key={d._id} >{d.name}</Option>)
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
                <Item label='图书' {...formItemLayout}>
                {
                    getFieldDecorator('book',{
                        initialValue:bookstock.book?bookstock.book._id:1,
                        rules:[
                        {required:true,message:'图书不能为空!'}
                        ]
                    })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="图书"
                            showArrow={false}
                            filterOption={false}
                            onSearch={this.handleSearchBooks}
                            notFoundContent={null}
                        >
                        {bookoptions}
                        </Select>
                    )
                }
                </Item>
                <Item label='数量' {...formItemLayout}>
                {
                    getFieldDecorator('nums',{
                        initialValue:bookstock.nums,
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