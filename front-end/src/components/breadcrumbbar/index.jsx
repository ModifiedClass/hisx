import React,{Component} from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

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
            </div>
        )
    }
}
export default connect(
    state=>({breadCrum:state.breadCrum}),
    {}
)(withRouter(BreadCrumBar))