import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,DatePicker,Select,Input} from 'antd'
import {shortDate} from '../../../../utils/dateUtils'
import {rBooks,rUsers,rBookStocks, rBorrowRecords} from '../../../../api'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
const Item=Form.Item
const {Option}=Select
const thisDate=shortDate(Date.now())

class AddForm extends Component{

    state={
        books:[],
        users:[],
        stock:0
    }
    
    static propTypes={
        setForm:PropTypes.func.isRequired,
        borrowrecord:PropTypes.object
    }
    
    handleSearchBooks=async value =>{
        const result=await rBooks({'name':value})
        if(result.status===1){
            this.setState({books:result.data.list})
        }  
    }

    handleSearchUsers=async value =>{
        if(value){
            const result1=await rUsers({'username':value})
            const result2=await rUsers({'name':value})
            if(result1.status===1){
                const users=result1.data
                this.setState({users})            
            }else if(result2.status===1){
                const users=result2.data
                this.setState({users}) 
            }else{
                this.setState({users:[]}) 
            }
        }else{
            this.setState({users:[]})
        }
    }
    
    getStock=async value =>{
        const bresult=await rBookStocks({'book':value})
        const brresult=await rBorrowRecords({'book':value,'status':false})
        let allstock=0
        let allbr=0
        if(bresult.status===1){
            const bs=bresult.data.list
            for(let i=0;i<bs.length;i++){
                allstock+=bs[i].nums
            }
        }
        if(brresult.status===1){
            const br=brresult.data.list
            allbr=br.length
        }
        this.setState({stock:allstock-allbr})
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {borrowrecord}=this.props
        const {users,books}=this.state
        const useroptions = users.map(d => <Option key={d._id} >{d.username}-{d.name}</Option>)
        const bookoptions = books.map(d => <Option key={d._id} >{d.bookcategory.name}-{d.name}</Option>)
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
                <Item label='图书' {...formItemLayout}>
                {
                    getFieldDecorator('book',{
                        rules:[
                        {required:true,message:'图书不能为空!'}
                        ]
                    })(
                        <Select
                            onChange={this.getStock}
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="选择图书"
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
                <Item label='库存' {...formItemLayout}>
                {
                    getFieldDecorator('stock',{
                        initialValue:this.state.stock,
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
                        initialValue:borrowrecord.details,
                        rules:[
                        {required:true,message:'借阅人不能为空!'}
                        ]
                    })(
                        <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="选择借阅人"
                            showArrow={false}
                            filterOption={false}
                            onSearch={this.handleSearchUsers}
                            notFoundContent={null}
                        >
                        {useroptions}
                        </Select>
                    )
                }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)