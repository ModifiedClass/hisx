import React,{Component} from 'react';
import {Col,Row,Select,DatePicker } from 'antd'

import ChartZdqk from './chart-zdqk'
import {getmzks,chart_qyzdqk,chart_bmyszdqk} from '../../../../api'

const Option=Select.Option
const { RangePicker } = DatePicker

export default class Zdqk extends Component{
    state={

        data1:[],
        data2:[],
        departments:[],
        seldep:264,
        display:'none'
    }
    initqyzlqk=async(startdate,enddate)=>{
        const res=await chart_qyzdqk(startdate,enddate)
        const data=[['标题', '收病人数', '药占比%', '材料占比%', '检查占比%', '治疗占比%', '其他费用占比%', '平均费用(元)']]
        for (let d in res){
             data.push(['诊疗情况',res[d][0],res[d][1],res[d][2],res[d][3],res[d][4],res[d][5],res[d][6]])
        }
        this.setState({
            data1:data
        })
    }
    initbmzlqk=async(department,startdate,enddate)=>{
        const res=await chart_bmyszdqk(department,startdate,enddate)
        const data=[['医师', '收病人数', '药占比%', '材料占比%', '检查占比%', '治疗占比%', '其他费用占比%', '平均费用(元)']]
        for (let d in res){
             data.push([res[d][0],res[d][1],res[d][2],res[d][3],res[d][4],res[d][5],res[d][6],res[d][7]])
        }
        this.setState({
            data2:data
        })
    }
    initData=async()=>{
        const res=await getmzks()
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
        const{data1,data2,departments,display}=this.state
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
                    <Col span={10}>
                        <ChartZdqk data={data1} title={title1} extra={extra1}/>
                    </Col>
                    <Col span={14}>
                        <ChartZdqk data={data2} title={title2} extra={extra2}/>
                    </Col>
                </Row>
            </div>
        )
    }
}