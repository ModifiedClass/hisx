import React,{Component} from 'react';
import {Col,Row,Select,DatePicker } from 'antd'

import ChartZlqk from './chart-zlqk'
import {getzyks,chart_qyzlqk,chart_bmyszlqk} from '../../../../api'

const Option=Select.Option
const { RangePicker } = DatePicker

export default class Zlqk extends Component{
    state={
        indicator:[
                    { name: '治愈率%',max:100},
                    { name: '好转率%',max:100},
                    { name: '未愈率%',max:100},
                    { name: '死亡率%',max:100},
                    { name: '其他%',max:100}
                ],
        data1:[],
        data2:[],
        legend1:[],
        legend2:[],
        departments:[],
        seldep:264,
        display:'none'
    }
    initqyzlqk=async(startdate,enddate)=>{
        const qyzlqk=await chart_qyzlqk(startdate,enddate)
        this.setState({
            data1:[{value: qyzlqk[0],name: '全院'}]
        })
    }
    initbmzlqk=async(department,startdate,enddate)=>{
        const res=await chart_bmyszlqk(department,startdate,enddate)
        const data=[]
        const legend=[]
        for (let d in res){
            data.push({
                value:[res[d][1],res[d][2],res[d][3],res[d][4],res[d][5]],
                name:res[d][0]
                })
            legend.push(res[d][0])
        }
        this.setState({
            data2:data,
            legend2:legend
        })
    }
    initData=async()=>{
        const res=await getzyks()
        const departments=[]
        for (let d in res){
            departments.push({'_id':res[d][0],'name':res[d][1]})
        }
        this.setState({
            departments
        })
    }
    
    daonChange=(date, dateString)=>{
        const startdate=dateString[0]
        const enddate=dateString[1]
        this.initqyzlqk(startdate,enddate)
    }
    
    dponChange=(date, dateString)=>{
        const department=this.state.seldep
        const startdate=dateString[0]
        const enddate=dateString[1]
        this.initbmzlqk(department,startdate,enddate)
    }
    selectDepartment=(value)=>{
        this.setState({seldep:value,display:''})
    }
    componentWillMount(){
        this.initData()
    }
    render(){
        const{indicator,data1,data2,legend1,legend2,departments,display}=this.state
        const departmentoptions = departments.map(d => <Option key={d._id} >{d.name}</Option>)
        const title1='全院'
        const extra1=<RangePicker onChange={this.daonChange} />
        const title2='部门'
        const extra2=<div>
                    <RangePicker onChange={this.dponChange} style={{display:display}}/>
                    <Select onChange={this.selectDepartment} style={{float:'right',width:'120px'}}>
                     {departmentoptions}
                    </Select>
                    </div>                    
        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={24}>
                    <Col xs={24} sm={10} md={10} lg={10} xl={10}>
                        <ChartZlqk indicator={indicator} data={data1} legend={legend1} title={title1} extra={extra1}/>
                    </Col>
                    <Col xs={24} sm={14} md={14} lg={14} xl={14}>
                        <ChartZlqk indicator={indicator} data={data2} legend={legend2} title={title2} extra={extra2}/>
                    </Col>
                </Row>
            </div>
        )
    }
}