import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Row, Col } from 'antd'

import {formateDate} from '../../utils/dateUtils'
import Start from './start'
import './index.css'

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
            <div style={{height:'100%'}}>
            <div className="canvas" style={{opacity: '.2'}}>
	            <iframe 
                    frameborder="0" 
                    src="./bg.html"
                    style={{ width: '100%',height: '100%'}}>
                </iframe>
            </div>
            <Row>
                <Col span={24}>
                    <div className="head">
                        <h1>数据可视化</h1>
                        <div className="weather">
                            <span >{currentTime}</span>
                            <Link to="/admin">后台</Link>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Start/>
                </Col>
            </Row>
            </div>
            
        )
    }
}
export default (withRouter(Visualization))