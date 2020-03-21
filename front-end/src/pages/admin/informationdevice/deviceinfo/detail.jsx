import React,{Component} from 'react';

import {Card,Descriptions} from 'antd'
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
    initStateDisplay=para=>{
        deviceStatus.map(item=>{
            if(String(item.value)===String(para)){
                this.setState({stateDisplay:item.label})
            }
        })
    }
    initDevicecategoryDisplay=para=>{
        /*const result=await rDeviceCategorys(para)
        this.setState({devicecategoryDisplay:result[0].data.name})*/
    }
    initDevicemodelDisplay=para=>{
        /*const result=await rDevicemodels(para)
        this.setState({devicemodelDisplay:result[0].data.name})*/
    }
    initParentDisplay=para=>{
        /*const result=await rDeviceInfos(para)
        this.setState({parentDisplay:result[0].data.name})*/
    }
    initInstalllocationDisplay=para=>{
        /*const result=await rInstalllocations(para)
        this.setState({installlocationDisplay:result[0].data.name})*/
    }
    initRunosDisplay=para=>{
        deviceRunSystem.map(item=>{
            if(String(item.value)===String(para)){
                this.setState({runosDisplay:item.label})
            }
        })
    }
    componentDidMount(){
        const {
            devicecategory,
            devicemodel,
            parent,
            installlocation,
            runos,
            status,
        }=this.props.location.state.deviceinfo
        this.initStateDisplay(status)
        this.initRunosDisplay(runos)      
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
                <Item label='类别：' span={1}>{devicecategoryDisplay}</Item>
                <Item label='型号：' span={2}>{devicemodelDisplay}</Item>
                <Item label='上级设备：' span={1}>{parentDisplay}</Item>
                <Item label='序列号：' span={2}>{sn}</Item>
                <Item label='设备名称：' span={1}>{name}</Item>
                <Item label='运行系统：' span={2}>{runosDisplay}</Item>
                <Item label='安装地点：' span={3}>{installlocationDisplay}</Item>
                <Item label='设备ip：' span={3}>{ip}</Item>
                <Item label='设备mac：' span={3}>{mac}</Item>
                <Item label='设备状态：' span={1}>{stateDisplay}</Item>
                <Item label='安装时间：' span={2}>{create_time}</Item>
              </Descriptions>
            </Card>  
        )
    }
}