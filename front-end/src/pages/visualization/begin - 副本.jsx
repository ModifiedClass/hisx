import React,{Component} from 'react'

import BBoxAll from './bboxall'
import BBoxAllSub from './bboxallsub'
import BBar from './bbar'
import BMap from './bmap'


export default class Begin extends Component{
    state={
        inhosnum:0,  //当前在院病人数
        consultationnum:0,  //当日就诊人次
        preparatorynum:0,   //预出院人数
        nochecknum:0,  //初始化出院未结账人数
        incomebythisday:{  //日结账统计
            incomebythisdaysum:0, //合计
            cname:[],  //列名
            cvalue:[],  //对应值
            color:'#2f89cf'
        },
        incomebythismon:{   //月结账统计
            incomebythismonsum:0, //合计
            cname:[],  //列名
            cvalue:[],  //对应值
            color:'#27d08a'
        },
        numbyday:{    //当月每天门诊入出院人次
            mons:[],
            consultation:[],
            emergency:[],
            inhos:[],
            outhos:[]
        },
        doctorload:{   //门诊医生负荷
            cname:[],  //列名
            cvalue:[],  //对应值
            title:'',
            subtitle:''
        },
        doctoratv:{   //门诊医生待诊
            cname:[],  //列名
            cvalue:[],  //对应值
            title:'',
            subtitle:''
        }, 
        avgwaitingtime:{  //就诊病人平均等待时间
            cname:[],  //列名
            cvalue:[],  //对应值
            title:'',
            subtitle:''
        },
        disease:{  //月疾病人次top10
            cname:[],  //列名
            cvalue:[],  //对应值
            color:'#2f89cf'
        },
        medinsu:{  //初始化医保类别费用比例
            medinsusum:0,
            miamount:[]
        },
    }
    
    //初始化当前在院病人数
    initinhosnum=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({inhosnum:0})
        },1000 * 60 * 5)
    }
    
    //初始化当日就诊人次
	initconsultationnum=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({consultationnum:0})
        },1000 * 60 * 5)
    }
    
    //初始化预出院人数
	initpreparatorynum=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({preparatorynum:0})
        },1000 * 60 * 5)
    }
    
    //初始化出院未结账人数
	initnochecknum=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({nochecknum:0})
        },1000 * 60 * 5)
    }
    
    //日结账统计 echarts_1 BBoxAll
    initincomebythisday=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({inhosnum:0})
        },1000 * 60 * 5)
    }
    
    //月结账统计 echarts_1 BBoxAll
	initincomebythismon=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({inhosnum:0})
        },1000 * 60 * 5)
    }
    
    //当月每天门诊入出院人次 echarts_4 BBoxAll
    initnumbyday=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({inhosnum:0})
        },1000 * 60 * 5)
    }
    
    //门诊医生负荷 echarts_31 BBoxAllSub
	initdoctorload=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({inhosnum:0})
        },1000 * 60 * 5)
    }
    
    //门诊医生待诊 echarts_31 BBoxAllSub
	initdoctoratv=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({inhosnum:0})
        },1000 * 60 * 5)
    }
    
    //就诊病人平均等待时间 echarts_31 BBoxAllSub
	initavgwaitingtime=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({inhosnum:0})
        },1000 * 60 * 5)
    }
    
    //月疾病人次top10 echarts_1 BBoxAll
    initdisease=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({inhosnum:0})
        },1000 * 60 * 5)
    }
    
    //初始化医保类别费用比例 echarts_6 BBoxAll
    initmedinsu=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({inhosnum:0})
        },1000 * 60 * 5)
    }
    //echartoption
    //柱状图
    echarts_1=(cname,cvalue,color)=>{
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '0%',
		        top:'10px',
                right: '0%',
                bottom: '4%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
      		    data: cname,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                        width: 1,
                        type: "solid"
                    },
                },
		        axisTick: {
                    show: false,
                },
		        axisLabel:  {
                    interval: 0,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
 					    color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
            }],
            yAxis: [{
                type: 'value',
                axisLabel: {
			        show:true,
			        extStyle: {
 					    color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,.1	)",
                        width: 1,
                        type: "solid"
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                    }
                }
            }],
            series: [{
                type: 'bar',
                data: cvalue,
                barWidth:'35%', //柱子宽度
                itemStyle: {
                    normal: {
                        color:color,
                        opacity: 1,
				        barBorderRadius: 5,
                    }
                }
            }]
        };
    }

    //波形图	mon：当月号数 consultation 就诊 
    echarts_4=(mons,consultation,emergency,inhos,outhos)=>{
        return{
	        tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#dddc6b'
                    }
                }
            },
		    legend: {
                top:'0%',
                data:['门诊','急诊','入院','出院'],
                textStyle: {
                    color: 'rgba(255,255,255,.5)',
			        fontSize:'12',
                }
            },
            grid: {
                left: '10',
		        top: '30',
                right: '10',
                bottom: '10',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel:  {
                    textStyle: {
 					    color: "rgba(255,255,255,.6)",
					    fontSize:12,
                    },
                },
                axisLine: {
			        lineStyle: { 
				        color: 'rgba(255,255,255,.2)'
			        }
                },
                data: mons
            }, {
                axisPointer: {show: false},
                axisLine: {  show: false},
                position: 'bottom',
                offset: 20,
            }],
            yAxis: [{
                type: 'value',
                axisTick: {show: false},
                axisLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                },
                axisLabel:  {
                    textStyle: {
 					    color: "rgba(255,255,255,.6)",
					    fontSize:12,
                    },
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(255,255,255,.1)'
                    }
                }
            }],
            series: [{
                name: '门诊',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
			        normal: {
				        color: '#0184d5',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        /*color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(1, 132, 213, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(1, 132, 213, 0.1)'
                        }], false),*/
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
			    itemStyle: {
			        normal: {
				        color: '#0184d5',
				        borderColor: 'rgba(221, 220, 107, .1)',
				        borderWidth: 12
			        }
		        },
                data: consultation

            },
	        {
                name: '急诊',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
			         normal: {
				        color: '#DC143C',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        /*color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(1, 132, 213, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(1, 132, 213, 0.1)'
                        }], false),*/
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
			    itemStyle: {
			        normal: {
				        color: '#DC143C',
				        borderColor: 'rgba(221, 220, 107, .1)',
				        borderWidth: 12
			        }
		        },
                data: emergency

            },
            {
                name: '入院',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
			        normal: {
				        color: '#00d887',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        /*color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 216, 135, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 216, 135, 0.1)'
                        }], false),*/
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
			    itemStyle: {
			        normal: {
				        color: '#00d887',
				        borderColor: 'rgba(221, 220, 107, .1)',
				        borderWidth: 12
			        }
		        },
                data: inhos

            }, 
	        {
                name: '出院',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
			        normal: {
				        color: '#EEB422',
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        /*color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 216, 135, 0.4)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 216, 135, 0.1)'
                        }], false),*/
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                    }
                },
			    itemStyle: {
			        normal: {
				        color: '#EEB422',
				        borderColor: 'rgba(221, 220, 107, .1)',
				        borderWidth: 12
			        }
		        },
                data: outhos
            },]
        };
    }
    //	miamount医保金额
    echarts_6=(miamount)=>{
        return{
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ['#CD5C5C', '#00CED1', '#9ACD32', '#FFC0CB','#FFD700','#00BFFF','#EE82EE','#DC143C'],
            stillShowZeroSum: false,
            series: [{
                name: '',
                type: 'pie',
                radius: '80%',
                center: ['50%', '50%'],
                data: miamount,
                itemStyle: {
                     emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(128, 128, 128, 0.5)'
                    }
                }
            }]
        };
    }
    //当前医生平均负荷
    echarts_31=(data1,data2,title,subtitle)=>{
        return {
	        title: [{
                text: title,
                left: 'center',
                textStyle: {
                    color: '#fff',
			        fontSize:'16'
                }
            }],
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)",
                /*position:(p)=>{   //其中p为当前鼠标的位置
                    [p[0] + 10, p[1] - 10];
                }*/
            },
            legend: {        
                top:'70%',
                itemWidth: 10,
                itemHeight: 10,
		        data:data1,
                textStyle: {
                    color: 'rgba(255,255,255,.5)',
			        fontSize:'12',
                }
            },
            series: [{
        	    name:subtitle,
                type:'pie',
			    center: ['50%', '42%'],
                radius: ['40%', '60%'],
                color: ['#065aab','#06f0ab'],	
                label: {show:false},
			    labelLine: {show:false},
			    data:data2
            }]
        };
    }
    
    componentDidMount(){
        this.initinhosnum()
    }
    
    componentWillUnmount(){
        clearInterval(this.intervalId)
    }
    
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
                    <BBoxAll title={'当日结账统计(元)'} sum={'incomebythisdaysum'} echartoption={'echarts_1'}/>
                    <BBoxAll title={'本月结账统计(元)'} sum={'incomebythismonsum'} echartoption={'echarts_1'}/>
                    <BBoxAll title={'当月出院病人医保费用比例(元)'} sum={'medinsusum'} echartoption={'echart6'}/>
                </li>
                <li style={listyle}>
                    <BBar inhosnum={this.tinitinhosnum()} consultationnum={this.initconsultationnum()}/>
                    <BMap preparatorynum={this.initpreparatorynum()} nochecknum={this.initnochecknum()}/>
                </li>
                <li style={listyle}>
                    <BBoxAll title={'本月门诊住院病人统计(人次)'} sum={''} echartoption={'echart4'}/>                    
	        		<BBoxAllSub title={''} sum={''} echartoptions={'echart4'}/>
                    <BBoxAll title={'当月出院病人疾病诊断统计(人次)'} sum={''} echartoption={'echart5'}/> 
                </li>    
            </ul>
        )
    }
}
