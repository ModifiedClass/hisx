import React,{Component} from 'react';
import {Card,Progress,Modal,Table } from 'antd'

import {BASE_RED,BASE_BLUE,BASE_DYELLOW} from '../../../../utils/colors'


export default class ChartTableSpace extends Component{
    state={
        localTsName:'',
        localTsNames:[],
        isShow:false
    }
    getTsName=(content)=>{
        console.log(content.target.innerHTML)
    }
    render(){
        const{data,title}=this.props
        const{localTsName}=this.state
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
                        loading={loading}
                        dataSource={groups}
                        columns={this.columns}
                    />
                </Modal>
            </Card>
        )
    }
}