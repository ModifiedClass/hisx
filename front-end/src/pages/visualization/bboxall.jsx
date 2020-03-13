import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'

import {boxall,alltitle,boxfoot,allnav} from './style.js'

export default class BBoxAll extends Component{
    
    render(){
        return(
            <div style={boxall}>
                <div style={alltitle}>{this.props.title}</div>
				{this.props.sum ?(
                    <span style={{color:'white'}}>合计:{this.props.sum}</span>
                ):(<span></span>)
                }
                <ReactEcharts style={allnav} option={this.props.echartoption}/>
                <div style={boxfoot}></div>
            </div>
        )
    }
}
