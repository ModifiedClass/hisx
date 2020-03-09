import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'

import {formateDate} from '../../utils/dateUtils'
import './index.css'
import './echarts.min.js'
import './liupanshui.js'
import Begin from './begin'

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
            <div>
                <div className="canvas" style={{opacity: .2}}>
	                <iframe 
                        frameborder="0" 
                        src="./bg.html"
                        style={{width: 100%; height: 100%}}>
                    </iframe>
	            </div>
                <div className="loading">
                    <div className="loadbox">
                        <img src="./img/loading.gif">
                        页面加载中... 
                    </div>
                </div>
                <div className="head">
                    <h1>{title}</h1>
                    <div className="weather">
                        <span id="showTime">{currentTime}</span>
                        <Link to="/admin">后台</Link>
                    </div>
                </div>
                <div className="mainbox">
                    <Begin />
                </div>
                <div className="back"></div>
            </div>
        )
    }
}
export default (withRouter(Visualization))