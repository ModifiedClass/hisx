import React,{Component} from 'react';
import {Card,Progress,Modal,Table } from 'antd'

import {BASE_RED,BASE_BLUE,BASE_DYELLOW} from '../../../../utils/colors'
import {getzlhistssub,gettjxttssub} from '../../../../api'

export default class ChartTableSpace extends Component{
    state={
        localTsName:'',
        localTsNames:[],
        isShow:false
    }
    initColums=()=>{
        this.columns=[
        {
            title:'表空间名',
            dataIndex:'name',
        },
        {
            title:'文件路径',
            dataIndex:'path',
        },
        {
            title:'体积',
            dataIndex:'size',
        },
        {
            title:'使用率',
            dataIndex:'percent'
        }
        ]
    }
    getTsName=async content=>{
        const tsname=content.target.innerHTML
        this.setState({isShow:true})
        const localTsNames=[]
        let res=[]
        if(this.props.thisname==='histitle'){
            res=await getzlhistssub(tsname)
        }else{
            res=await gettjxttssub(tsname)
        }
        for (let d in res){
            localTsNames.push({
                'name':res[d][0],
                'path':res[d][1],
                'size':res[d][2],
                'percent':res[d][3]
            })
        }
        this.state({localTsNames})
    }
    render(){
        const{data,title}=this.props
        const{localTsName,isShow}=this.state
        return(
            <Card title={title}>
                {
                    data.map(d=>
                        <div key={d.name}>
                            <span onClick={this.getTsName} style={{width:'120px'}}>{d.name}</span>
                            <Progress 
                            style={{width:'70%',float:'right'}} 
                            percent={d.value}
                            strokeColor={d.value>95?BASE_RED:(d.value>80?BASE_DYELLOW:BASE_BLUE)}
                            />
                        </div>
                    )
                }
                <Modal
                    title={localTsName}
                    visible={isShow}
                    onCancel={()=>{
                        this.setState({isShow:false})
                    }}
                >
                    <Table
                        bordered
                        rowKey='_id'
                        dataSource={data}
                        columns={this.columns}
                    />
                </Modal>
            </Card>
        )
    }
}