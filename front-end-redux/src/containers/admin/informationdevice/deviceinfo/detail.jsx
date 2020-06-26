import React,{Component} from 'react';

import {Card,Descriptions} from 'antd'
import BackBtn from '../../../../components/backbtn'
import {deviceRunSystem,deviceStatus} from '../../../../config/selectConfig'
import {shortDate} from '../../../../utils/dateUtils'

const Item=Descriptions.Item

export default class DeviceInfoDetail extends Component{
    runosdisplay=para=>{
        let display=''
        deviceRunSystem.forEach(item=>{
            if(item.value===String(para)){
                display= item.label
            }
        })
        return display
    }
    
    statusdisplay=para=>{
        let display=''
        deviceStatus.forEach(item=>{
            if(item.value===String(para)){
                display= item.label
            }
        })
        return display
    }
    
    render(){
        const {
            devicemodel,
            parent,
            installlocation,
            runos,
            sn,
            name,
            ip,
            mac,
            status,
            remarks,
            installdate
        }=this.props.location.state.deviceinfo
        
        const title=(
            <span>
                <BackBtn onClick={()=>this.props.history.goBack()}/>
                <span>设备详情</span>
            </span>
        )
        return(
            <Card title={title}>
              <Descriptions bordered>
                <Item label='类别：' span={1}>{devicemodel.devicecategory.name}</Item>
                <Item label='型号：' span={2}>{devicemodel.name}</Item>
                <Item label='上级设备：' span={1}>{parent?parent.name:'无'}</Item>
                <Item label='序列号：' span={2}>{sn}</Item>
                <Item label='设备名称：' span={1}>{name}</Item>
                <Item label='运行系统：' span={2}>{this.runosdisplay(runos)}</Item>
                <Item label='安装地点：' span={3}>{installlocation.name}</Item>
                <Item label='设备ip：' span={3}>{ip}</Item>
                <Item label='设备mac：' span={3}>{mac}</Item>
                <Item label='设备状态：' span={1}>{this.statusdisplay(status)}</Item>
                <Item label='安装时间：' span={2}>{shortDate(installdate)}</Item>
                <Item label='备注：' span={3}>{remarks}</Item>
              </Descriptions>
            </Card>  
        )
    }
}