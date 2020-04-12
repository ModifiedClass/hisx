import React,{Component} from 'react';
import {Card,Badge} from 'antd'
import ReactEcharts from 'echarts-for-react'

import {rDeviceInfos,rDeviceCategorys} from '../../../api'


export default class ChartDevice extends Component{
    state={
        data:[]
    }

    
    getOption=(arr)=>{
        return{
            backgroundColor: '#2c343c',

            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },

            /*visualMap: {
                show: false,
                min: 1,
                max: 1000,
                inRange: {
                    colorLightness: [0, 1]
                }
            },*/
            series: [
                {
                    name: '设备结构',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: arr.sort(function (a, b) { return a.value - b.value; }),
                    roseType: 'radius',
                    label: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    labelLine: {
                        lineStyle: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        smooth: 0.2,
                        length: 10,
                        length2: 20
                    },
                    itemStyle: {
                        color: '#c23531',
                        shadowBlur: 200,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },

                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return Math.random() * 200;
                    }
                }
            ]
        }
    }
    initData=async()=>{
        const dcs=[]
        const di=await rDeviceInfos({'isPage':false})
        const dc=await rDeviceCategorys()
        if(dc.status===1){
            for(let i=0;i<dc.data.length;i++){
                dcs.push(dc.data[i].name)
            }
        }
        if(di.status===1){
            const data=[]
            const sum=di.data.list.length
            for(let i=0;i<dcs.length;i++){
                let nums=0
                for(let j=0;j<sum;j++){
                    if(di.data.list[j].devicemodel.devicecategory.name===dcs[i]){
                        nums++
                    }
                }
                data.push({value: nums, name: dcs[i]})
            }
            this.setState({data,sum})
        }
    }
     componentWillMount(){
        this.initData()
    }
    render(){
        
        const{data}=this.state
        const extra=<span>设备总计:&nbsp;&nbsp;<Badge count={this.state.sum} style={{ backgroundColor: '#52c41a' }} /></span>
        return(
            <Card title='设备结构' extra={extra}>
                <ReactEcharts option={this.getOption(data)}/>
            </Card>
        )
    }
}