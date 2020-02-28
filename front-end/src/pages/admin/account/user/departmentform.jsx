import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,Input,Tree} from 'antd'

import reqDepartments from '../../../../api/json/department'

const {TreeNode} =Tree

const departmentList=reqDepartments.data

export default class DepartmentForm extends Component{
    constructor(props){
        super(props)
        
        const {department}=this.props.user
        this.state={
            checkedKeys:department
        }
    }
    static propTypes={
        user:PropTypes.object
    }

    getdepartments=()=>this.state.checkedKeys
    
    getTreeNodes=departmentList=>{
        return departmentList.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.name} key={item._id}>
                    {item.children ? this.getTreeNodes(item.children):null}
                </TreeNode>
            )
            return pre
        },[])
    }
    onCheck=checkedKeys=>{
        this.setState({checkedKeys})
    }
    componentWillMount(){
        this.treeNodes=this.getTreeNodes(departmentList)
    }
    
    //组建收到新属性时调用
    componentWillReceiveProps(nextProps){
        const departments=nextProps.user.department
        this.setState({
            checkedKeys:departments
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
                    <TreeNode title='部门列表' key='all'>
                    {this.treeNodes}
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}