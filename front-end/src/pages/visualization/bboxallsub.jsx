import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'

import {boxall,alltitle,boxfoot} from './style.js'

export default class BBoxAllSub extends Component{
    
    render(){
        return(
            <div style={boxall}>
                <div style={alltitle}>{this.props.title}</div>
				{this.props.sum ?(
                    <span style={{color:'white'}}>合计:{this.props.sum}</span>
                ):(<span></span>)
                }
                    <div style={{height:'100%',width: '100%'}}>
                    {
                        /*this.props.echartoptions.map((item,key)=>{
                            return <ReactEcharts style={allnav} option={item}/>
                        })*/
                    }
		            </div>
                <div style={boxfoot}></div>
            </div>
        )
    }
}
