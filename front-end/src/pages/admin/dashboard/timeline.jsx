import React,{Component} from 'react';
import {Card,Button,Timeline,Select,Icon} from 'antd'

import {rTimeLines} from '../../../api'
import {shortDate,formateYear} from '../../../utils/dateUtils'

const Option=Select.Option

export default class DTimeLine extends Component{
    state={
        reverse: false,
        years:[],
        tls:[]
    }
    
    handleClick = () => {
        this.setState({ reverse: !this.state.reverse });
    }
    
    selectYear=value=>{
        console.log(value)
    }
    
    initTimelines=async()=>{
        const result=await rTimeLines()
        if(result.status===1){
            const tls=result.data
            const years=['all']
            tls.forEach(tl=>{
                years.push(formateYear(tl.create_time))
            })
            this.setState({
                tls,years
            })
            
        }
    }
    
    componentWillMount(){
        this.initTimelines()
    }
    
    render(){
        const{years,reverse,tls}=this.state
        const title='时间轴'
        const menu=(
            <Select className="searchbar-select" onChange={this.selectYear}>
                {years.map(year=><Option key={year} value={year}>{year}</Option>)}
            </Select>
        )
        return(
            <Card title={title} extra={menu} bordered={false}>
                <div>
                    <Timeline pending="读取..." reverse={reverse}>
                        {
                            tls.map(tl=>
                                <Timeline.Item key={tl._id}>
                                {tl.name+' '+shortDate(tl.create_time)}
                                {tl.details?  <span>&nbsp;<Icon type="profile" theme="twoTone" /></span>:<span></span>}
                                </Timeline.Item>
                            )
                        }
                    </Timeline>
                    <Button type="primary" style={{ marginTop: 16 }} onClick={this.handleClick}>
                         排序
                    </Button>
                </div>
            </Card>
        )
    }
}