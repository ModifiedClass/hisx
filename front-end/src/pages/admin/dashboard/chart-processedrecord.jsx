import React,{Component} from 'react';
import {Card,Badge} from 'antd'
import ReactEcharts from 'echarts-for-react'

import {rProcessedRecords,rProblemCategorys} from '../../../api'

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
                data:legenddata.slice(0,3)
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
        const legenddata=[]

        const pr=await rProcessedRecords({'isPage':false})
        const pc=await rProblemCategorys()
        if(pc.status===1){
            for(let i=0;i<pc.data.length;i++){
                legenddata.push(pc.data[i].name)
            }
        }
        if(pr.status===1){
            const seriesdata=[]
            const sum=pr.data.list.length
            for(let i=0;i<legenddata.length;i++){
                let nums=0
                for(let j=0;j<sum;j++){
                    if(pr.data.list[j].problem_category.name===legenddata[i]){
                        nums++
                    }
                }
                seriesdata.push({value: nums, name: legenddata[i]})
            }
            this.setState({legenddata,seriesdata,sum})
        }
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