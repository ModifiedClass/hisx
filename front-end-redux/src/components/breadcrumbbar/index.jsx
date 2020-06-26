import React,{Component} from 'react';
import {withRouter,Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Icon} from 'antd'

import './index.less'

class BreadCrumBar extends Component{
    
    render(){
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