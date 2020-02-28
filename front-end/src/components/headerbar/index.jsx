import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import {Modal,Icon} from 'antd'
import {connect} from 'react-redux'

import LinkBtn from '../../components/linkbtn'
import {formateDate} from '../../utils/dateUtils'
import {logout} from '../../redux/actions'
//import memUtils from '../../utils/memUtils'
//import storeUtils from '../../utils/storeUtils'

import './index.less'
class HeaderBar extends Component{
    state={
        currentTime:formateDate(Date.now())
    }
    getTime=()=>{
        this.intervalId=setInterval(()=>{
            const currentTime=formateDate(Date.now())
            this.setState({currentTime:currentTime})
        },1000)
    }
    
    logout=()=>{
        Modal.confirm({
            content:'确定退出吗?',
            onOk(){
                /*
                this.props.logout()
                storeUtils.removeUser()
                memUtils.user={}
                this.props.history.replace('/login')*/
            }
        })
    }
    componentDidMount(){
        this.getTime()
    }
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    render(){
        const {currentTime} =this.state
        //const user=this.props.user.username
        return(
            <div className="header">
                    
                    <div className="header-left">
                        <Link to='/'>
                            <span>&reg;HISX</span>
                        </Link>
                    </div>
                <div className="header-right">
                    <span>{currentTime}&nbsp;&nbsp;欢迎,</span>
                    <span>root{/*username*/}</span>
                    <LinkBtn onClick={this.logout}><Icon type="logout" style={{color:'#479761'}}/></LinkBtn>
                </div>    
            </div>
        )
    }
}
export default connect(
    state=>({}),
    {}
)(HeaderBar)