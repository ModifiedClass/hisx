import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Col,Row,Select,DatePicker } from 'antd'

import ChartZdqk from './chart-zdqk'
import {chartQyzdqk,chartBmyszdqk,rMzks} from '../../../../redux/actions/analysis-action'

const Option=Select.Option
const { RangePicker } = DatePicker

class Zdqk extends Component{
    state={

        data1:[],
        data2:[],
        departments:[],
        seldep:264,
        display:'none'
    }
    initqyzlqk=async(startdate,enddate)=>{
        await this.props.chartQyzdqk(startdate,enddate)
        const res=this.props.chartmanage
        this.setState({
            data1:res.data
        })
    }
    initbmzlqk=async(department,startdate,enddate)=>{
        await this.props.chartBmyszdqk(department,startdate,enddate)
        const res=this.props.chartmanage
        this.setState({
            data2:res.data
        })
    }
    initData=async()=>{
        await this.props.rMzks()
        const res=this.props.chartmanage
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
export default connect(
    state=>({chartmanage:state.chartmanage}),
    {chartQyzdqk,chartBmyszdqk,rMzks}
)(Zdqk)