import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,Input,Tree} from 'antd'

const {TreeNode} =Tree

export default class DepartmentForm extends Component{
    constructor(props){
        super(props)
        
        const {department}=this.props.user
        let keys=[]
        for(let key in department){
            keys.push(department[key]._id)
        }
        this.state={
            checkedKeys:keys
        }
    }
    static propTypes={
        user:PropTypes.object
    }

    //为父组件提供选中节点
    getDepartments=()=>this.state.checkedKeys
    
    getTreeNodes=list=>{
        return list?list.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.name} key={item._id}>
                    {item.children ? this.getTreeNodes(item.children):null}
                </TreeNode>
            )
            return pre
        },[]):{}
    }
    onCheck=checkedKeys=>{
        this.setState({checkedKeys})
    }
    
    componentWillMount(){
        this.treeNodes=this.getTreeNodes(this.props.initDepartment)
    }
    
    //组建收到新属性时调用
    componentWillReceiveProps(nextProps){
        const departments=nextProps.user.department
        let keys=[]
        for(let key in departments){
            if(typeof(departments[key])==='number'||typeof(departments[key])==='string')
                keys.push(Number(departments[key]))
            else
                keys.push(Number(departments[key]._id))
        }
        
        this.setState({
            checkedKeys:keys
        })
    }
    
    render(){
        const {user}=this.props
        const {checkedKeys}=this.state
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <div>
                <Form.Item label='用户名' {...formItemLayout}>
                    <Input value={user.username} disabled/>
                </Form.Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    {this.treeNodes}
                </Tree>
            </div>
        )
    }
}