import React,{Component} from 'react';
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'

import {rProcessedRecords,rProblemCategorys} from '../../../api'
import {get30Days} from '../../../utils/dateUtils.js'


export default class ChartPRD extends Component{
    state={
        legenddata:[],
        xdate:[],
        seriesdata:[]
    }
    
    getOption=(legenddata,xdate,seriesdata)=>{
        return{
            tooltip: {
                //trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data:legenddata.slice(0,3)
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
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
                    boundaryGap: false,
                    data: xdate
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: seriesdata
        }
    }
    initData=async()=>{
        const legenddata=[]
        const xdate=get30Days()

        const pr=await rProcessedRecords({'isPage':false})
        const pc=await rProblemCategorys()
        if(pc.status===1){
            for(let i=0;i<pc.data.length;i++){
                legenddata.push(pc.data[i].name)
            }
        }
        if(pr.status===1){
            const seriesdata=[]
            for(let i=0;i<legenddata.length;i++){
                const two=[]
                for(let j=0;j<xdate.length;j++){
                    let nums=0
                    for(let k=0;k<pr.data.list.length;k++){
                        if(pr.data.list[k].create_time.substring(0,10)===xdate[j]&&pr.data.list[k].problem_category.name===legenddata[i]){
                            nums++
                        }
                    }
                    two.push(nums)
                }
                seriesdata.push({
                    name: legenddata[i],
                    type: 'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {},
                    data:two
                })
            }
            this.setState({xdate,legenddata,seriesdata})
        }
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