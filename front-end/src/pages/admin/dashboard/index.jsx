import React,{Component} from 'react';
import {Card,Button,Col,Row,Timeline,Select} from 'antd'
import ReactEcharts from 'echarts-for-react'

import Chart from './chart'
import DTimeLine from './timeline'

const Option=Select.Option

export default class Dashboard extends Component{

    render(){

        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={16}>
                        <Chart />
                    </Col>
                    <Col span={8}>
                        <DTimeLine/>
                    </Col>
                </Row>
            </div>
        )
    }
}