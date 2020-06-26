import React,{Component} from 'react';
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'

import {chart_processedrecord_day} from '../../../api'


export default class ChartPRD extends Component{
    state={
        legenddata:[],
        xdate:[],
        seriesdata:[]
    }
    
    getOption=(legenddata,xdate,seriesdata)=>{
        return{
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:legenddata
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    name:'时间',
                    boundaryGap: false,
                    data: xdate
                }
            ],
            yAxis: {
                type: 'value',
                name:'数量',
                minorTick: {
                    show: true
                },
                minorSplitLine: {
                    show: true
                }
            },
            series: seriesdata
        }
    }
    initData=async()=>{
        //console.time('计时器')
        const temp=await chart_processedrecord_day()
        this.setState({
            xdate:temp.xdate,
            legenddata:temp.legenddata,
            seriesdata:temp.seriesdata
        })
        //console.timeEnd('计时器')
    }
    componentWillMount(){
        this.initData()
    }
    render(){
        
        const{legenddata,xdate,seriesdata}=this.state
        const bartitle='近期每日各类问题量'
        return(
            <Card title={bartitle}>
                <ReactEcharts option={this.getOption(legenddata,xdate,seriesdata)}/>
            </Card>
        )
    }
}