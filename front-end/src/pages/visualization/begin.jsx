import React,{Component} from 'react'

import BBoxAll from './bboxall'
import BBoxAllSub from './bboxallsub'
import BBar from './bbar'
import BMap from './bmap'
import {
    echartHistogram,
    echartWaveform,
    echartPie,
    echartCircle
} from './echartoptions.js'


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
        },
        incomebythismon:{   //月结账统计
            incomebythismonsum:0, //合计
            cname:[],  //列名
            cvalue:[],  //对应值
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
        },
        medinsu:{  //初始化医保类别费用比例
            medinsusum:0,
            miamount:[]
        },
    }
    
    //初始化当前在院病人数
    initinhosnum=()=>{
        this.intervalId=setInterval(()=>{
            let res=1000
            this.setState({inhosnum:res})
        },1000 * 60 * 5)
    }
    
    //初始化当日就诊人次
	initconsultationnum=()=>{
        this.intervalId=setInterval(()=>{
            let res=800
            this.setState({consultationnum:res})
        },1000 * 60 * 5)
    }
    
    //初始化预出院人数
	initpreparatorynum=()=>{
        this.intervalId=setInterval(()=>{
            let res=20
            this.setState({preparatorynum:res})
        },1000 * 60 * 5)
    }
    
    //初始化出院未结账人数
	initnochecknum=()=>{
        this.intervalId=setInterval(()=>{
            let res=50
            this.setState({nochecknum:res})
        },1000 * 60 * 5)
    }
    
    //日结账统计 echarts_1 BBoxAll
    initincomebythisday=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({
                incomebythisday:{
                    incomebythisdaysum:200000,
                    cname:['t1','t2','t3','t4','t5'],
                    cvalue:[50000,80000,10000,18000,42000],
                },
            })
        },1000 * 60 * 5)
    }
    
    //月结账统计 echarts_1 BBoxAll
	initincomebythismon=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({
                incomebythismon:{
                    incomebythismonsum:2000000,
                    cname:['t1','t2','t3','t4','t5'], 
                    cvalue:[500000,800000,100000,180000,420000],
                }
            })
        },1000 * 60 * 5)
    }
    
    //当月每天门诊入出院人次 echarts_4 BBoxAll
    initnumbyday=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({
                numbyday:{
                    mons:[1,2,3,4,5],
                    consultation:[6,7,3,6,2],
                    emergency:[2,6,1,7,8],
                    inhos:[3,6,1,7,8],
                    outhos:[8,5,3,9,4]
                }
            })
        },1000 * 60 * 5)
    }
    
    //门诊医生负荷 echarts_31 BBoxAllSub
	initdoctorload=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({
                doctorload:{
                    cname:[],
                    cvalue:[],
                    title:'',
                    subtitle:''
                }
            })
        },1000 * 60 * 5)
    }
    
    //门诊医生待诊 echarts_31 BBoxAllSub
	initdoctoratv=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({
                doctoratv:{
                    cname:[],
                    cvalue:[],
                    title:'',
                    subtitle:''
                }
            })
        },1000 * 60 * 5)
    }
    
    //就诊病人平均等待时间 echarts_31 BBoxAllSub
	initavgwaitingtime=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({
                avgwaitingtime:{
                    cname:[],
                    cvalue:[],
                    title:'',
                    subtitle:''
                }
            })
        },1000 * 60 * 5)
    }
    
    //月疾病人次top10 echarts_1 BBoxAll
    initdisease=()=>{
        this.intervalId=setInterval(()=>{
            this.setState({
                disease:{
                    cname:[],
                    cvalue:[],
                }
            })
        },1000 * 60 * 5)
    }
    
    //初始化医保类别费用比例 echarts_6 BBoxAll
    initmedinsu=(medinsu)=>{
        this.intervalId=setInterval(()=>{
            this.setState({
                medinsu:{
                    medinsusum:0,
                    miamount:[]
                }
            })
        },1000 * 60 * 5)
    }

    
    componentDidMount(){
        this.initinhosnum()
        this.initconsultationnum()
        this.initpreparatorynum()
        this.initnochecknum()
        this.initincomebythisday()
        this.initincomebythismon()
        this.initnumbyday()
        this.initdoctorload()
        this.initdoctoratv()
        this.initavgwaitingtime()
        this.initdisease()
        this.initmedinsu()
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
                    <BBoxAll 
                    title={'当日结账统计(元)'} 
                    sum={this.state.incomebythisday.incomebythisdaysum} 
                    echartoption={this.echartHistogram(this.state.incomebythisday.cname,this.state.incomebythisday.cvalue,'#2f89cf')}
                    />
                    <BBoxAll 
                    title={'本月结账统计(元)'} 
                    sum={this.state.incomebythismon.incomebythismonsum} 
                    echartoption={this.echartHistogram(this.state.incomebythismon.cname,this.state.incomebythismon.cvalue,'#27d08a')}
                    />
                    <BBoxAll 
                    title={'当月出院病人医保费用比例(元)'} 
                    sum={this.state.medinsu.medinsusum} 
                    echartoption={this.echartPie(this.state.medinsu.miamount)}
                    />
                </li>
                <li style={listyle}>
                    <BBar 
                    inhosnum={this.state.inhosnum} 
                    consultationnum={this.state.consultationnum}
                    />
                    <BMap 
                    preparatorynum={this.state.preparatorynum} 
                    nochecknum={this.state.nochecknum}
                    />
                </li>
                <li style={listyle}>
                    <BBoxAll 
                    title={'本月门诊住院病人统计(人次)'} 
                    sum={false} 
                    echartoption={this.echartWaveform(this.state.numbyday.mons,this.state.numbyday.consultation,this.state.numbyday.emergency,this.state.numbyday.inhos,this.state.numbyday.outhos)}
                    />                    
	        		<BBoxAllSub 
                    title={''} 
                    sum={false} 
                    echartoptions={[
                        this.echartCircle(this.state.doctorload.cname,this.state.doctorload.cvalue,this.state.doctorload.title,this.state.doctorload.subtitle),
                        this.echartCircle(this.state.doctoratv.cname,this.state.doctoratv.cvalue,this.state.doctoratv.title,this.state.doctoratv.subtitle),
                        this.echartCircle(this.state.avgwaitingtime.cname,this.state.avgwaitingtime.cvalue,this.state.avgwaitingtime.title,this.state.avgwaitingtime.subtitle)
                    ]}
                    />
                    <BBoxAll 
                    title={'当月出院病人疾病诊断统计(人次)'} 
                    sum={false} 
                    echartoption={this.echartHistogram(this.state.disease.cname,this.state.disease.cvalue,'#2f89cf')}
                    /> 
                </li>    
            </ul>
        )
    }
}
