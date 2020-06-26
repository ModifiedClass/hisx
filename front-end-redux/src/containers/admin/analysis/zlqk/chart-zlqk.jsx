import React,{Component} from 'react';
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'
import PropTypes from 'prop-types'


export default class ChartZlqk extends Component{

    static propTypes={
        title:PropTypes.string.isRequired,
        data:PropTypes.object,
        extra:PropTypes.element
    }

    getOption=(indicator,data,legend)=>{
        return{
            tooltip: {
                position: ['50%', '30%']
            },
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
                name: '',
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