import React,{Component} from 'react'


export default class BBar extends Component{
    
    render(){
        return(
            <div className="bar">
                <div className="barbox">
                    <ul className="clearfix">
                        <li className="pulll_left counter">{this.props.inhosnum}</li>
                        <li className="pulll_left counter">{this.props.consultationnum}</li>
                    </ul>
                </div>
                <div className="barbox2">
                    <ul className="clearfix">
                        <li className="pulll_left">在院病人数 </li>
                        <li className="pulll_left">当日就诊人次</li>
                    </ul>
                </div>
            </div>
        )
    }
}
