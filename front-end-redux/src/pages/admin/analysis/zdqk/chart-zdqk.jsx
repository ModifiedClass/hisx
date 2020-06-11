import React,{Component} from 'react';
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'




export default class ChartZdqk extends Component{

    getOption=(data)=>{
        return{
            legend: {},
            tooltip: {
                position: ['50%', '30%']
            },
            dataset: {
                source: data
            },
            xAxis: {type: 'category'},
            yAxis: {},
            // Declare several bar series, each will be mapped
            // to a column of dataset.source by default.
            series: [
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'},
                {type: 'bar'}
            ]
        }
    }   
    
    render(){
        const{data,title,extra}=this.props
        return(
            <Card title={title} extra={extra}>
                <ReactEcharts option={this.getOption(data)}/>
            </Card>
        )
    }
}