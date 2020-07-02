import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import { Menu, Icon} from 'antd'

import './index.less'

import menuList from '../../config/menuConfig'
import {setBreadCrum} from '../../redux/actions/account-action'

const { SubMenu } = Menu

class SiderBar extends Component{

    hasAuth = item =>{
        const {key,isPublic}=item
        const menus=this.props.user.menus
        const username=this.props.user.username
        if(username==='admin' ||isPublic||menus.indexOf(key)!==-1){
            return true
        }else if(item.children){
            return !!!item.children.find(child=>menus.indexOf(child.key!==-1))
        }
        return false
    }
    
    /*mapMenuNodes=menuList=>{
        const path=this.props.location.pathname
        return menuList.map(item=>{
            if(this.hasAuth(item)){
                if(!item.children){
                    //判断item是否当前对于的item，更新redux中BreadCrum状态
                    if(item.key===path||path.indexOf(item.key)===0){
                        this.props.setBreadCrum(item.title)
                    }
                    return (
                        <Menu.Item key={item.key} >
                            <Link to={item.key} onClick={()=>this.props.setBreadCrum(item.title)}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                }else{
                    //const cItem=item.children.find(cItem=>cItem.key===path)
                    //产品路径有子类,将路径改为父类,菜单自动展开
                    //const cItem=item.children.find(cItem=>path.indexOf(cItem.key===0))
                    //if(cItem){
                    //    this.openKey=item.key
                    //}
                    return(
                        <SubMenu key={item.key} title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }>
                        {this.mapMenuNodes(item.children)}
                        </SubMenu>
                    )
                }
            }
        })
    }*/

    reduceMenuNodes=menuList=>{
        const path=this.props.location.pathname
        return menuList.reduce((pre,item)=>{
            if(this.hasAuth(item)){
                //pre添加<Menu.Item>
                if(!item.children){
                    if(item.key===path||path.indexOf(item.key)===0){
                        this.props.setBreadCrum(item.title)
                    }
                    pre.push((
                        <Menu.Item key={item.key} >
                            <Link to={item.key} onClick={()=>this.props.setBreadCrum(item.title)}>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    ))
                }else{
                    //pre添加<SubMenu>
                    pre.push((
                        <SubMenu key={item.key} title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }>
                        {this.reduceMenuNodes(item.children)}
                        </SubMenu>
                    ))
                }
            }
            return pre
        },[])
    }

    componentWillMount(){
        //this.menuNodes=this.mapMenuNodes(menuList)
        this.menuNodes=this.reduceMenuNodes(menuList)
    }
    render(){
        let path=this.props.location.pathname
        //产品路径有子类,将路径改为父类,菜单自动选中
        if(path.indexOf('/processedrecord')===0){
            path='/processedrecord'
        }
        if(path.indexOf('/deviceinfo')===0){
            path='/deviceinfo'
        }
        const openKey=this.openKey
        return(
            <div className="siderbar" >
                <Menu 
                mode='vertical' 
                style={{ width: '100%'}} 
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
                >
                    {this.menuNodes}                    
                </Menu>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {setBreadCrum}
)(withRouter(SiderBar))