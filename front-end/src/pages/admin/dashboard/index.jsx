import React,{Component} from 'react';
import {Card,Button,Col,Row,Timeline,Select} from 'antd'
import ReactEcharts from 'echarts-for-react'

const Option=Select.Option

export default class Dashboard extends Component{
    state={
        sales:[10,8,9,6],
        stores:[12,9,5,3],
        reverse: false,
    }
    
    handleClick = () => {
        this.setState({ reverse: !this.state.reverse });
    }
    selectYear=()=>{
        console.log('')
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
        const ttitle='时间轴'
        const tmenu=(
            <Select className="searchbar-select" onChange={value=>{console.log(value)}}>
                <Option value='2020'>2020</Option>
                <Option value='2019'>2019</Option>
            </Select>
        )
        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={16}>
                    <Col span={16}>
                        <Card title={bartitle} extra={barbtn} bordered={false}>
                            <ReactEcharts option={this.getOption(sales,stores)}/>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title={ttitle} extra={tmenu} bordered={false}>
                            <div>
                                <Timeline pending="Recording..." reverse={this.state.reverse}>
                                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                                </Timeline>
                                <Button type="primary" style={{ marginTop: 16 }} onClick={this.handleClick}>
                                    Toggle Reverse
                                </Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}