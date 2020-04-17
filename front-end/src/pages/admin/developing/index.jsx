import React,{Component} from 'react'

import {Card,Calendar,Badge } from 'antd'

import {getDaysInMonth} from '../../../utils/dateUtils'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')


export default class Developing extends Component{
    constructor(props){
        super(props)
        const date=new Date()
        this.state={
            selectyear:date.getFullYear(),
            selectmonth:date.getMonth()+1,
            selectday:date.getDate(),
            dayshifts:['申爱华','高丽','杨贵华'], //白班人员
            changeshifts:[{'key':0,'name':'李玉旋','next':1},{'key':1,'name':'陈忠良','next':2},{'key':2,'name':'廖睿','next':0}],//倒班人员
        }
        this.count=0
    }
    getDuty=(thisdate,dutys,nums)=>{
        //thisdate:****-**-**
        /*dutys:[{
            'key':1,
            'type':'dayshifts',
            'users':[{
                'key':1,
                'name':,'',
                'next':2
            },{
                'key':2,
                'name':,'',
                'next':1
            }]},{
            'key':2,
            'type':'eveningshifts',
            'users':[{
                'key':1,
                'name':,'',
                'next':2
            },{
                'key':2,
                'name':,'',
                'next':1
            }]},{
            'key':3,
            'type':'nightshifts',
            'users':[{
                'key':1,
                'name':,'',
                'next':2
            },{
                'key':2,
                'name':,'',
                'next':1
            }]}]*/
    }
    getListData=(value)=>{
        //输入调休日
        const num=value._d.getDay()
        const listData=[]
        const thisdate=new Date()
        const thismonth=thisdate.getMonth()
        const thisyear=thisdate.getFullYear()
        if(value.month()===thismonth&&value.year()===thisyear){
            if(num!==6&&num!==0){
                let ds=''
                for(let j=0;j<this.state.dayshifts.length;j++){
                    ds+=this.state.dayshifts[j]+','
                }
                listData.push({ type: 'success', content: ds.substring(0,ds.length-1) })
                listData.push({ type: 'warning', content: this.state.changeshifts[this.count].name })
            }else{
                listData.push({ type: 'warning', content: this.state.changeshifts[this.count].name })
            }
        }
        this.count=this.state.changeshifts[this.count].next
        return listData || []
    }

    dateCellRender=(value)=>{
      const listData = this.getListData(value);
      return (
        <ul className="events">
          {listData.map(item => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      )
    }
    onPanelChange=(value)=>{
        this.setState({
            selectyear:value.year(),
            selectmonth:value.month()+1,
            selectday:value.date()
        })
    }
    initData=()=>{
        
        //console.log(getDaysInMonth(this.state.selectyear,this.state.selectday))
    }
    
    onSelect=(value)=>{
        console.log(value)
        console.log(value.year())
        //console.log(value.month()+1)
        //console.log(value.date())
    }
    componentWillMount(){
        this.initData()
    }
    render(){
        const {selectyear,selectmonth,selectday}=this.state
        const title=selectyear+'-'+selectmonth+'-'+selectday
        return(
            <Card title={title}>
                <Calendar
                dateCellRender={this.dateCellRender} 
                onPanelChange={this.onPanelChange} 
                onSelect={this.onSelect} />
            </Card>
        )
    }
}