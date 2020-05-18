import React,{Component} from 'react';
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'




export default class ChartZlqk extends Component{

    getOption=(indicator,data,legend)=>{
        return{
            tooltip: {},
            legend: {
                orient: 'vertical',
                //orient: 'horizontal',
                left: 1,
                data: legend
            },
            radar: {
                 shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                    }
                },
                indicator: indicator
            },
            series: [{
                name: '个人 vs 部门',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: data
            }]
        }
    }   
    
    render(){
        const{indicator,data,legend,title,extra}=this.props
        return(
            <Card title={title} extra={extra}>
                <ReactEcharts option={this.getOption(indicator,data,legend)}/>
            </Card>
        )
    }
}