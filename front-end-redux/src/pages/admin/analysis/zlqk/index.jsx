import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Col,Row,Select,DatePicker } from 'antd'

import ChartZlqk from './chart-zlqk'
import {chartQyzlqk,chartBmyszlqk,rZyks} from '../../../../redux/actions/analysis-action'

const Option=Select.Option
const { RangePicker } = DatePicker

class Zlqk extends Component{
    state={
        indicator:[
                    { name: '收病人数'},
                    { name: '患者平均住院天数'},
                    { name: '治愈率%',max:100},
                    { name: '好转率%',max:100},
                    { name: '未愈率%',max:100},
                    { name: '死亡率%',max:100},
                    { name: '其他%',max:100},
                    { name: '三日内确诊率%',max:100},
                    { name: '入出院诊断符合率%',max:100},
                    { name: '药占比%',max:100},
                    { name: '材料占比%',max:100},
                    { name: '检查占比%',max:100},
                    { name: '治疗占比%',max:100},
                    { name: '其他费用占比%',max:100},
                    { name: '平均费用'}
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
        await this.props.chartQyzlqk(startdate,enddate)
        const qyzlqk=this.props.chartsmanage
        this.setState({
            data1:[{value: qyzlqk,name: '全院'}]
        })
    }
    initbmzlqk=async(department,startdate,enddate)=>{
        await this.props.chartBmyszlqk(department,startdate,enddate)
        const res=this.props.chartsmanage
        this.setState({
            data2:res.data.data,
            legend2:res.data.legend
        })
    }
    initData=async()=>{
        await this.props.rZyks()
        const res=this.props.chartsmanage
        this.setState({
            departments:res.data
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
export default connect(
    state=>({chartsmanage:state.chartsmanage}),
    {chartQyzlqk,chartBmyszlqk,rZyks}
)(Zlqk)