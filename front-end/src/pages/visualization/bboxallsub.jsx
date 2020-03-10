import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'

export default class BBoxAllSub extends Component{
    
    render(){
        return(
            <div className="boxall" style={{height: '3.2rem'}}>
                <div className="alltitle">{this.props.title}</div>
				({this.props.sum}?<span style={{color:'white'}}>合计:{this.props.sum}</span>:{''})
                    <div style={{height:'100%',width: '100%'}}>
                    {
                        /*this.props.echartoptions.map((item,key)=>{
                            return <ReactEcharts className="allnav" option={item}/>
                        })*/
                    }
		            </div>
                <div className="boxfoot"></div>
            </div>
        )
    }
}
