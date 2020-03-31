import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,Input,Tree} from 'antd'

import operList from '../../../../config/operationConfig'

const {TreeNode} =Tree

export default class AuthOperationForm extends Component{
    constructor(props){
        super(props)
        
        //根据组权限初始化操作
        const {operation}=this.props.group
        this.state={
            checkedKeys:operation?operation.split(','):operation
        }
    }
    static propTypes={
        group:PropTypes.object
    }
    
    //为父组件提供最新选中操作
    getOperations=()=>this.state.checkedKeys 
    
    getTreeNodes=(list)=>{
        return list.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.name} key={item.method}>
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
        this.treeNodes=this.getTreeNodes(operList)
    }
    
    //组建收到新属性时调用
    componentWillReceiveProps(nextProps){//根据新传入group更新选中菜单
        const opers=nextProps.group.operation
        
        this.setState({
            checkedKeys:opers?opers.split(','):opers
        })
    }
    
    render(){
        const {group}=this.props
        const {checkedKeys}=this.state
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <div>
                <Form.Item label='组名称' {...formItemLayout}>
                    <Input value={group.name} disabled/>
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