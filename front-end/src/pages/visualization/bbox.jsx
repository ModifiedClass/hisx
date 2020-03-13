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
                    data:sales
                },{
                    name:'库存',
                    type:'bar',
                    data:stores 
                }]
            }
        }
    render(){
        
        const{sales,stores}=this.state
        return(
            <div style={boxall}>
            <div style={alltitle}>测试</div>
            <ReactEcharts option={this.getOption(sales,stores)}/>
            <div style={boxfoot}>测试</div>
            </div>
        )
    }
}
