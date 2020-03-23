import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,Input,Tree} from 'antd'


export default class ReviewForm extends Component{
    constructor(props){
        super(props)
        state={
            nums:0
        }
        const {users}=this.props.users
    }
    
    getHanelerNums=(value)=>{
        const result=rPrinterRepairs({'_hanlder':value})
        let nums=0
        for(let i=0;i<result.data.length;i++){
            nums+=result.data.nums
        }
        return nums
        this.setState({nums})
    }    
    
    render(){
        const {users}=this.props
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <Form>
                <Form.Item label='处理人员' {...formItemLayout}>
                {
                    getFieldDecorator('_handler',{
                        rules:[
                        {required:true,message:'处理人员不能为空!'}
                        ]
                    })(
                    <Select onChange={value=>this.getHanelerNums(value)}>
                        {
                            users.map(item=><Option key={item._id} value={item._id}>{item.name}</Option>)
                        }
                    </Select>
                 )
                }
                <Input value={this.state.nums} disabled/>
            </Form>
        )
    }
}