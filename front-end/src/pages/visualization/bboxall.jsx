import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'


export default class BBoxAll extends Component{
    
    render(){
        return(
            <div className="boxall" style={{height: '3.2rem'}}>
                <div className="alltitle">{this.props.title}</div>
				{this.props.sum ?(
                    <span style={{color:'white'}}>合计:{this.props.sum}</span>
                ):(<span></span>)
                }
                <ReactEcharts className="allnav" option={this.props.echartoption}/>
                <div className="boxfoot"></div>
            </div>
        )
    }
}
