import React,{Component} from 'react';
import {Col,Row} from 'antd'

import ChartPRD from './chart-processedrecord-day'
import DTimeLine from './timeline'
import ChartDevice from './chart-device'
import ChartPR from './chart-processedrecord'


export default class Dashboard extends Component{

    render(){

        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={16}>
                        <Row>
                            <ChartPRD />
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <ChartDevice />
                            </Col>
                            <Col span={12}>
                                <ChartPR />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <DTimeLine/>
                    </Col>
                </Row>
            </div>
        )
    }
}