import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Layout} from 'antd';

import {formateDate} from '../../utils/dateUtils'
import {canvas,bodystyle,headstyle,headtitle,weather,weatherspan,mainbox} from './style.js'
//import './index.less'
//import './liupanshui.js'
import BBox from './bbox'

const { Header, Content } = Layout;

class Visualization extends Component{
    state={
        currentTime:formateDate(Date.now())
    }
    getTime=()=>{
        this.intervalId=setInterval(()=>{
            const currentTime=formateDate(Date.now())
            this.setState({currentTime:currentTime})
        },1000)
    }
    componentDidMount(){
        this.getTime()
    }
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    render(){
        const {currentTime} =this.state
        const title="数据可视化"
        return(
            <Layout style={bodystyle}>
                <div style={canvas}>
	                <iframe 
                        frameborder="0" 
                        src="./bg.html"
                        style={{ width: '100%',height: '100%'}}>
                    </iframe>
	            </div>
                <Header style={{padding:'0px'}}>
                    <div style={headstyle}>
                        <h1 style={headtitle}>{title}</h1>
                        <div style={weather}>
                            <span style={weatherspan}>{currentTime}</span>
                            <Link to="/admin">后台</Link>
                        </div>
                    </div>
                </Header>
                <Content sytle={{height:'100%',position:'relative',padding:0}}>
                        <BBox/>
                </Content>
            </Layout>
        )
    }
}
export default (withRouter(Visualization))