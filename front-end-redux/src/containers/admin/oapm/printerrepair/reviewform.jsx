import React,{Component} from 'react';

import {Form,Input,Select} from 'antd'
import {rPrinterRepairs} from '../../../../api'

const Option=Select.Option

export default class ReviewForm extends Component{
    constructor(props){
        super(props)
        this.state={
            nums:0,
            user:1
        }
    }
    
    gethandler=()=>this.state.user
    
    getHanelerNums=async(value)=>{
        this.setState({nums:0})
        const result=await rPrinterRepairs({'handler':value,'status':false})
        if(result.status===1){
            let nums=0
            for(let i=0;i<result.data.length;i++){
                nums+=1
            }
            this.setState({nums,user:value})
        }
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
                    <Select onChange={value=>this.getHanelerNums(value)}>
                        {
                            users.map(item=><Option key={item._id} value={item._id}>{item.name}</Option>)
                        }
                    </Select>
                <Input value={this.state.nums} disabled/>
                </Form.Item>
            </Form>
        )
    }
}