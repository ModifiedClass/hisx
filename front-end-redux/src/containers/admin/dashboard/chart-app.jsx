import React,{Component} from 'react';
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'


export default class ChartApp extends Component{
    state={
        data:[
                {value: 335, name: '客户机'},
                {value: 310, name: '交换机'},
                {value: 274, name: '打印机'},
                {value: 235, name: '自助机'},
                {value: 400, name: '笔记本'}
            ]
    }

    
    getOption=(data)=>{
        return{
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['his', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
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
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ]
                }
            ]
        }
    }
    
    render(){
        
        const{data}=this.state
        const bartitle='信息系统设备结构'
        return(
            <Card title={bartitle}  bordered={false}>
                <ReactEcharts option={this.getOption(data)}/>
            </Card>
        )
    }
}