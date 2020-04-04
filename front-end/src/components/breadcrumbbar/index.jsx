import React,{Component} from 'react';
import {withRouter,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Icon} from 'antd'

import menuList from '../../config/menuConfig'
import './index.less'

class BreadCrumBar extends Component{
    getTitle=()=>{
        let title
        const path=this.props.location.pathname
        menuList.forEach(item=>{
            if(item.key===path){
                title=item.title
            }else if(item.children){
                const cItem=item.children.find(cItem=>cItem.key===path)
                if(cItem){
                    title=cItem.title
                }
            }
        })
        return title
    }
    render(){
        //const title=this.getTitle()
        const title=this.props.breadCrum
        return(
            <div className="breadcrum">
                <span>后台管理/{title}</span>
                <Link to='/setting'>
                <Icon 
                type="setting" 
                style={{float:'right',fontSize:'20px',lineHeight:'40px',marginRight:'10px'}}
                />
                </Link>
            </div>
        )
    }
}
export default connect(
    state=>({breadCrum:state.breadCrum}),
    {}
)(withRouter(BreadCrumBar))