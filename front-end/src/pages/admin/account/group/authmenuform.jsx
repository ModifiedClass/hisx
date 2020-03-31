import React,{Component} from 'react';
import PropTypes from 'prop-types'

import {Form,Input,Tree} from 'antd'

import menuList from '../../../../config/menuConfig'

const {TreeNode} =Tree

export default class AuthMenuForm extends Component{
    constructor(props){
        super(props)
        
        //根据组权限初始化菜单
        const {menu}=this.props.group
        this.state={
            checkedKeys:menu.split(',')
        }
    }
    static propTypes={
        group:PropTypes.object
    }

    //为父组件提供最新选中菜单
    getMenus=()=>this.state.checkedKeys
    
    //返回所有菜单用于显示界面
    getTreeNodes=list=>{
        return list.reduce((pre,item)=>{
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children):null}
                </TreeNode>
            )
            return pre
        },[])
    }
    
    //选中nodes时回调设置选中状态
    onCheck=checkedKeys=>{
        this.setState({checkedKeys})
    }
    
    componentWillMount(){
        this.treeNodes=this.getTreeNodes(menuList)
    }
    
    //组建收到新属性时调用
    componentWillReceiveProps(nextProps){//根据新传入group更新选中菜单
        const menus=nextProps.group.menu.split(',')
        this.setState({
            checkedKeys:menus?menus.split(','):menus
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