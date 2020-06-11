import React,{Component} from 'react';
import {Modal,message,Card,Table,Select} from 'antd'

import {gethislocktables,hisunlocktables,gettjxtlocktables} from '../../../../api'
import EditBtn from '../../../../components/editbtn'

const Option=Select.Option


export default class LockTables extends Component{

    state={
        loading:false,
        data:[],
        localdb:'1'
    }
    
    initColums=()=>{
        this.columns=[
        {
            title:'表名',
            dataIndex:'name',
        },
        {
            title:'sessionid',
            dataIndex:'sessionid',
        },
        {
            title:'serial',
            dataIndex:'serial',
        },
        {
            title:'操作',
            width:300,
            render:(locktable)=>(
            <span>
                <EditBtn onClick={()=>this.unlockTable(locktable)}/>
            </span>
            )
        }
        ]
    }
    
    unlockTable=(locktable)=>{
        Modal.confirm({
            title:'确认解锁 '+locktable.name+' 吗？',
            onOk:async()=>{
                /*if(this.state.localdb==='1'){
                    const result=await hisunlocktables(locktable.sessionid+','+locktable.serial)
                    if(result){
                        message.success('解锁成功！')
                        this.selectType('1')
                    }else{
                        message.error('解锁失败！')
                    }
                }else{
                    const result=await tjxtunlocktables(locktable.sessionid+','+locktable.serial)
                    if(result){
                        message.success('解锁成功！')
                        this.selectType('1')
                    }else{
                        message.error('解锁失败！')
                    }
                } */ 
                message.error('开发中！')
            }
        })
    }
    
    selectType=async(value)=>{
        this.setState({
            localdb:value
        })
        let result=[]
        this.setState({loading:true})
        if(value==='1'){
            result=await gethislocktables()
        }else{
            result=await gettjxtlocktables()
        }
        this.setState({loading:false})
        if(result){
            const data=[]
            let i=1
            for (let d in result){
                data.push({
                    '_id':i,
                    'name':result[d][0],
                    'sessionid':result[d][1],
                    'serial':result[d][2]
                })
                i++
            }
            this.setState({
                data
            })
        }else{
            message.error("获取数据失败!")
        }
    }
    
    componentWillMount(){
        this.initColums()
    }
    render(){
        const {data,loading}=this.state
        const extra=(<Select onChange={this.selectType} style={{width:'150px'}}>
                    <Option value='1'>his锁表情况</Option>
                    <Option value='2'>体检系统锁表情况</Option>
                </Select>)
        return(
            <Card extra={extra} >
                <Table
                rowKey='_id'
                bordered
                loading={loading}
                dataSource={data}
                columns={this.columns}
                />
            </Card>
        )
    }
}