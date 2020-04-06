import React,{Component} from 'react';
import {Card,Button} from 'antd'
import ReactEcharts from 'echarts-for-react'


export default class Chart extends Component{
    state={
        sales:[10,8,9,6],
        stores:[12,9,5,3],
    }

    update=()=>{
        this.setState(state=>({
            sales:state.sales.map(sale=>sale+1),
            stores:state.stores.reduce((pre,store)=>{
                pre.push(store-1)
                return pre
            },[]),
        }))
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
        const bartitle='数据'
        const barbtn=(<Button type='primary' onClick={this.update}>update</Button>)
        return(
            <Card title={bartitle} extra={barbtn} bordered={false}>
                <ReactEcharts option={this.getOption(sales,stores)}/>
            </Card>
        )
    }
}