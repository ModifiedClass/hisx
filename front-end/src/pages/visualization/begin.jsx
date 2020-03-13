import React,{Component} from 'react'

import BBoxAll from './bboxall'
import BBoxAllSub from './bboxallsub'
import BBar from './bbar'
import BMap from './bmap'


export default class Begin extends Component{
    render(){
        const listyle={
            float: 'left',
            padding: 0,
            width: '30%',
            listStyleType:'none',
        }
        
        return(
            <ul className="clearfix">
                <li style={listyle}>
                    <BBoxAll title={'当日结账统计(元)'} />
                    <BBoxAll title={'本月结账统计(元)'}/>
                    <BBoxAll title={'当月出院病人医保费用比例(元)'}/>
                </li>
                <li style={listyle}>
                    <BBar />
                    <BMap />
                </li>
                <li style={listyle}>
                    <BBoxAll title={'本月门诊住院病人统计(人次)'} />                    
	        		<BBoxAllSub title={''} />
                    <BBoxAll title={'当月出院病人疾病诊断统计(人次)'} /> 
                </li>    
            </ul>
        )
    }
}
