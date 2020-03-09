import React,{Component} from 'react'


export default class BMap extends Component{
    
    render(){
        return(
            <div className="map">
                <div className="map1"><img src="./img/lbx.png"></div>
                <div className="map2"><img src="./img/jt.png"></div>
                <div className="map3"><img src="./img/map.png"></div>
                <div className="map4" id="map_1"></div>
			    <div className="">
                    <div className="barbox">
                        <ul className="clearfix">
                            <li className="pulll_left counter">{this.props.preparatorynum}</li>
                            <li className="pulll_left counter">{this.props.nochecknum}</li>
                        </ul>
                    </div>
                    <div className="barbox2">
                        <ul className="clearfix">
                            <li className="pulll_left">预出院病人数 </li>
                            <li className="pulll_left">当月出院未结账人数</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
