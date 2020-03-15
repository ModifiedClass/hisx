import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'


export default class BBar extends Component{
    
    render(){
        return(
            <div class="bar">
                <div class="barbox">
                    <ul class="clearfix">
                        <li class="pulll_left counter">{this.props.nowhosnum}</li>
                        <li class="pulll_left counter">{this.props.inhosnum}</li>
						<li class="pulll_left counter">{this.props.outhosnum}</li>
						<li class="pulll_left counter">{this.props.ssnum}</li>
                    </ul>
                </div>
                <div class="barbox2">
                    <ul class="clearfix">
                        <li class="pulll_left">在院病人数 </li>
                        <li class="pulll_left">入院病人数</li>
						<li class="pulll_left">出院病人数</li>
						<li class="pulll_left">手术台数</li>
                    </ul>
                </div>
            </div>
        )
    }
}
