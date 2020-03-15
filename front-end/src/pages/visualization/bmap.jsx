import React,{Component} from 'react'
import { Row, Col } from 'antd'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts'
import geoJson from './liupanshui.json'
import {lpsgeoCoordMap} from "./geo"

import lbx from './img/lbx.png'
import jt from './img/jt.png'
import map from './img/map.png'

export default class BMap extends Component{
    
    render(){
        echarts.registerMap('liupanshui', geoJson)
        return(
            <div className="map">
                <Row justify={'center'} align={'middle'}>
                <Col span={24}>
                <div className='map1'><img style={{width:'100%'}} src={lbx}/></div>
                <div className='map2'><img style={{width:'100%'}} src={jt}/></div>
                <div className="map3"><img style={{width:'100%'}} src={map}/></div>
                <ReactEcharts className="map4" option={this.props.echartoption}/>
                </Col>
                </Row>
                <Row>
                <Col span={24}>
			    <div className="">
                    <div className="barbox">
                        <ul className="clearfix">
                            <li className="pulll_left counter">{this.props.pznum}</li>
                            <li className="pulll_left counter">{this.props.jznum}</li>
                            <li className="pulll_left counter">{this.props.zznum}</li>
                            <li className="pulll_left counter">{this.props.nochecknum}</li>
                        </ul>
                    </div>
                    <div className="barbox2">
                        <ul className="clearfix">
                            <li className="pulll_left">普通门诊 </li>
                            <li className="pulll_left">急诊</li>
                            <li className="pulll_left">专家门诊</li>
                            <li className="pulll_left">当月出院未结账人数</li>
                        </ul>
                    </div>
                </div>
                </Col>
                </Row>
            </div>
        )
    }
}
