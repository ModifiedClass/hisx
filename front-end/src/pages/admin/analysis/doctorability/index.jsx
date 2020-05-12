import React,{Component} from 'react';
import {Card,Select} from 'antd'
import ReactEcharts from 'echarts-for-react'

const Option=Select.Option


export default class DoctorAbility extends Component{
    state={
        data1:[],
        indicator: [],
        data2:0
    }

    
    getOption=(data1,indicator,data2)=>{
        return{
            tooltip: {},
            legend: {
                left: 1,
                data: data1
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
                data: data2
            }]
        }
    }   
    initData=async()=>{
        this.setState({
            data1: ['某某', '部门均值'],
            indicator:[
                    { name: '治愈',max:100},
                    { name: '好转',max:100},
                    { name: '未愈',max:100},
                    { name: '死亡',max:100},
                    { name: '其他',max:100}
                ],
            data2:[
                    {
                        value: [52, 83, 36, 21, 0, 0],
                        name: '某某'
                    },
                    {
                        value: [60, 84, 37, 20, 0, 0],
                        name: '部门均值'
                    }
                ]
        })
    }
    
    componentWillMount(){
        this.initData()
    }
    render(){
        
        const{data1,indicator,data2}=this.state
        const title='管床医生收治情况分析'
        const extra=<div>
            选择部门：
            <Select onChange={this.selectdoctor} style={{float:'right'}}>
                <Option key='1' value='1'>某某</Option>
            </Select>
            选择医生：
            <Select onChange={this.selectDepartment} style={{float:'right'}}>
                <Option key='1' value='1'>泌尿外科</Option>
            </Select>
            
        </div>
        return(
            <Card title={title} extra={extra}>
                <ReactEcharts option={this.getOption(data1,indicator,data2)}/>
            </Card>
        )
    }
}