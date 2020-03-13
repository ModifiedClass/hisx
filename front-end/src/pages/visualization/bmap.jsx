import React,{Component} from 'react'
import ReactEcharts from 'echarts-for-react'

import {mapstyle,map1,map2,map3,map4,bar,barbox,barboxli} from './style.js'
import lbx from './img/lbx.png'
import jt from './img/jt.png'
import map from './img/map.png'
const lpsgeoCoordMap = {
    '钟山区': [104.850143,26.580516],
    '六枝特区': [105.484326,26.220432],
    '盘县': [104.478137,25.715625],
    '水城县': [104.964352,26.553344]
}

export default class BMap extends Component{
    state={
        data:[]
    }
    convertData = (lpsdata)=>{
        var res = [];
        for (var i = 0; i < lpsdata.length; i++) {
            var geoCoord = lpsgeoCoordMap[lpsdata[i].name];
            if (geoCoord) {
                res.push({
                    name: lpsdata[i].name,
                    value: geoCoord.concat(lpsdata[i].value)
                });
            }
        }
        return res;
    }
    getOption = (lpsdata)=>{
        return{
        title: {
            text: '当月出院病人区域分布',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        tooltip : {
            trigger: 'item',
		    formatter: function (params) {
                if(typeof(params.value)[2] == "undefined"){
              	    return params.name + ' : ' + params.value;
                }else{
              	    return params.name + ' : ' + params.value[2];
                }
            }
        },
  
        geo: {
            show:true,
            map: 'liupanshui',
            label: {
                emphasis: {
                    show:true,  //是否显示文本
                    color:'#CCC',  //文本颜色
                }
            },
            roam: true,//放大缩小
            itemStyle: {
                normal: {
                    areaColor: '#4c60ff',
                    borderColor: '#002097'
                },
                emphasis: {
                    areaColor: '#293fff'
                }
            },
        },
        series : [{
            name: '病人数',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data:this.convertData(lpsdata),
            symbolSize: function (val) {
                return val[2] / 15;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffeb7b'
                }
            },
            rippleEffect: { //涟漪特效相关配置。
                brushType: 'stroke' //波纹的绘制方式
            },
            hoverAnimation: true, //鼠标移入放大圆
        }]}
    }
    initMap=(res)=>{
        let data=[];
		for(var i=0;i<res.length;i++){
			var str={'name':res[i][1],'value':res[i][0]};
			data.push(str);
		}
        this.setState({
            data:data
        })
    }
    componentDidMount(){
        this.initMap(this.state.data)
    }
    
    render(){
        const{data}=this.state
        return(
            <div style={mapstyle}>
                <div style={map1}><img src={lbx}/></div>
                <div style={map2}><img src={jt}/></div>
                <div style={map3}><img src={map}/></div>
                <div style={map4} id="map_1"></div>
                <ReactEcharts option={this.getOption(data)}/>
			    <div style={bar}>
                    <div style={barbox}>
                        <ul className="clearfix">
                            <li style={barboxli}>{this.props.preparatorynum}</li>
                            <li style={barboxli}>{this.props.nochecknum}</li>
                        </ul>
                    </div>
                    <div className="barbox2">
                        <ul className="clearfix">
                            <li style={{float:'left',listStyleType:'none'}}>预出院病人数 </li>
                            <li style={{float:'left',listStyleType:'none'}}>当月出院未结账人数</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
