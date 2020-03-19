import React,{Component} from 'react';

import {Card,Icon,Descriptions, Badge,Empty} from 'antd'
import {BASE_GREEN,BASE_RED,BASE_BLUE} from '../../../../utils/colors'
import {BASE_IMG_URL} from '../../../../utils/constants'
import BackBtn from '../../../../components/backbtn'
import {deviceRunSystem,deviceStatus} from '../../../../config/selectConfig'

const Item=Descriptions.Item

export default class DeviceInfoDetail extends Component{
    state={
        stateDisplay:'',
        devicecategoryDisplay:'',
        devicemodelDisplay:'',
        parentDisplay:'',
        installlocationDisplay:'',
        runosDisplay:'',
    }
     
    componentDidMount(){
        const {
            devicecategory,
            devicemodel,
            parent,
            installlocation,
            runos,
            status
        }=this.props.location.state.deviceinfo
         /*const result=await reqState(pstateId)
         const pstate=result.data.name
         this.setState({pstate})*/
           
        const stateDisplay=status==='3' ? (
            <Badge color={BASE_RED} text="停用" />
        ) :(status==='2' ? (
            <Badge color={BASE_GREEN} text="维修" />
        ):(
            <Badge color={BASE_BLUE} text="正常" />
        ))
        this.setState({stateDisplay})
     }
    render(){
        const { 
        sn,
        name,
        ip,
        mac,
        status,
        create_time
        }=this.props.location.state.deviceinfo
        const {
            stateDisplay,
            devicecategoryDisplay,
            devicemodelDisplay,
            parentDisplay,
            installlocationDisplay,
            runosDisplay,
        }=this.state
        const title=(
            <span>
                <BackBtn onClick={()=>this.props.history.goBack()}/>
                <span>设备详情</span>
            </span>
        )
        return(
            <Card title={title}>
              <Descriptions bordered>
                <Item label='类别：' span={3}>{devicecategoryDisplay}</Item>
                <Item label='型号：' span={3}>{devicemodelDisplay}</Item>
                <Item label='序列号：' span={3}>{sn}</Item>
                <Item label='上级设备：' span={3}>{parentDisplay}</Item>
                <Item label='安装地点：' span={3}>{installlocationDisplay}</Item>
                <Item label='运行系统：' span={3}>{runosDisplay}</Item>
                <Item label='设备名称：' span={3}>{name}</Item>
                <Item label='设备ip：' span={3}>{ip}</Item>
                <Item label='设备mac：' span={3}>{mac}</Item>
                <Item label='设备状态：' span={3}>{stateDisplay}</Item>
                <Item label='安装时间：' span={3}>{create_time}</Item>
              </Descriptions>
            </Card>  
        )
    }
}