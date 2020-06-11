import React,{Component} from 'react';
import {Card,Badge} from 'antd'
import ReactEcharts from 'echarts-for-react'

import {chart_processedrecord} from '../../../api'

export default class ChartPR extends Component{
    state={
        legenddata:[],
        seriesdata: [],
        sum:0
    }

    
    getOption=(legenddata,seriesdata)=>{
        return{
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                //orient: 'horizontal',
                left: 1,
                data:legenddata
            },
            series: [
                {
                    name: '运维记录分析',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: seriesdata
                }
            ]
        }
    }
    initData=async()=>{
        const temp=await chart_processedrecord()
        this.setState({
            legenddata:temp.legenddata,
            seriesdata:temp.seriesdata,
            sum:temp.sum
        })
    }
     componentWillMount(){
        this.initData()
    }
    render(){
        
        const{legenddata,seriesdata,sum}=this.state
        const title='各类问题比例'
        const extra=<span>问题数总计:&nbsp;&nbsp;<Badge count={sum} overflowCount={1000000}/></span>
        return(
            <Card title={title} extra={extra}>
                <ReactEcharts option={this.getOption(legenddata,seriesdata)}/>
            </Card>
        )
    }
}