import React,{Component} from 'react';
import {Card,Progress } from 'antd'

import {BASE_RED,BASE_BLUE,BASE_DYELLOW} from '../../../../utils/colors'


export default class ChartTableSpace extends Component{
  
    render(){
        const{data,title}=this.props
        return(
            <Card title={title}>
                {
                    data.map(d=>
                        <div key={d.name}>
                            <span style={{width:'120px'}}>{d.name}</span>
                            <Progress 
                            style={{width:'70%',float:'right'}} 
                            percent={d.value}
                            strokeColor={d.value>95?BASE_RED:(d.value>80?BASE_DYELLOW:BASE_BLUE)}
                            />
                        </div>
                    )
                }
            </Card>
        )
    }
}