import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'
import {boxall,alltitle,boxfoot,allnav} from './style.js'
export default class BBox extends Component{
    
    state={
        sales:[10,8,9,6],
        stores:[12,9,5,3],
    }
        getOption=(sales,stores)=>{
            return{
                title:{
                    text:'bar'
                },
                tooltip:{},
                legend:{
                    data:['销量','库存']
                },
                xAxis:{
                    data:["iphone","ipad","suface","samsung"]
                },
                yAxis:{},
                series:[{
                    name:'销量',
                    type:'bar',
                    data:sales,
                    barWidth:'35%', //柱子宽度
                        itemStyle: {
                            normal: {
                                color:'#2f89cf',
                                opacity: 1,
				                barBorderRadius: 5,
                            }
                        }
                },{
                    name:'库存',
                    type:'bar',
                    data:stores ,
                    barWidth:'35%', //柱子宽度
                        itemStyle: {
                            normal: {
                                color:'#27d08a',
                                opacity: 1,
				                barBorderRadius: 5,
                            }
                        }
                }]
            }
        }
    render(){
        
        const{sales,stores}=this.state
        return(
            <div style={boxall}>
            <div style={alltitle}>测试</div>
            <ReactEcharts option={this.getOption(sales,stores)} style={{minHeight:'inherit'}}/>
            <div style={boxfoot}>测试</div>
            </div>
        )
    }
}
