import React,{Component} from 'react'
import { Row, Col } from 'antd'

import {mGetDate} from '../../utils/dateUtils'
import BBoxAll from './bboxall'
import BBoxAllSub from './bboxallsub'
import BBar from './bbar'
import BMap from './bmap'
import {
    echartHistogram,
    echartWaveform,
    echartPie,
    echartCircle,
    echartLpsMap,
    echartMuHistogram
} from './echartoptions.js'
import {
    getpatdis,
    getinhosnum,
    getnochecknum,
    getdisease,
    getnumbyday,
    getmedinsu,
    getincomebythisday,
    getincomebythismon,
    getdoctorload,
    getdoctoratv,
    getavgwaitingtime
} from '../../api'

export default class Start extends Component{
    state={
        nowhosnum:0,  //在院病人数
        inhosnum:0,  //入院病人数
        outhosnum:0,//出院病人数
        ssnum:0,//手术台数
        pznum:0,//普通门诊
        jznum:0,//急诊
        zznum:0,//专家门诊
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
        lpsdata:[]
    }
    
    //初始化实时病人信息
    initinhosnum=()=>{
        this.intervalId=setInterval(()=>{
            const res=getinhosnum()
            if(res){
                this.setState({
                    nowhosnum:res.now,
                    inhosnum:res.in,
                    outhosnum:res.out,
                    ssnum:res.ss,
                    pznum:res.pz,
                    jznum:res.jz,
                    zznum:res.zz,
                })
            }
        },1000 * 60 * 5)
    }
    
    //初始化出院未结账人数
	initnochecknum=()=>{
        this.intervalId=setInterval(()=>{
            const res=getnochecknum()
            if(res){
                this.setState({nochecknum:res})
            }
        },1000 * 60 * 5)
    }
    
    //日结账统计 echarts_1 BBoxAll
    initincomebythisday=()=>{
        this.intervalId=setInterval(()=>{
            const res=getincomebythisday()
            if(res){
                let cname=[]
                let cvalue=[]
                let sum=0
                /*for(let i=0;i<res.length;i++){
                    cname.push(res[i][1])
                    cvalue.push(res[i][0])
                    sum+=parseFloat(res[i][0])
                }*/
                res.forEach((item,key) =>{
                    cname.push(res[key][1])
                    cvalue.push(res[key][0])
                    sum+=parseFloat(res[key][0])
                    return item
                })
                const incomebythisdaysum="合计:"+sum.toFixed(2)
                this.setState({
                    incomebythisday:{
                        incomebythisdaysum:incomebythisdaysum,
                        cname:cname,
                        cvalue:cvalue,
                    },
                })
            }
        },1000 * 60 * 5)
    }
    
    //月结账统计 echarts_1 BBoxAll
	initincomebythismon=()=>{
        this.intervalId=setInterval(()=>{
            const res=getincomebythismon()
            if(res){
                let cname=[]
                let cvalue=[]
                let sum=0
                res.map((item,key) =>{
                    cname.push(res[key][1])
                    cvalue.push(res[key][0])
                    sum+=parseFloat(res[key][0])
                    return item
                })
                const incomebythismonsum="合计:"+sum.toFixed(2)
                this.setState({
                    incomebythismon:{
                        incomebythismonsum:incomebythismonsum,
                        cname:cname, 
                        cvalue:cvalue,
                    }
                })
            }
        },1000 * 60 * 5)
    }
    
    //当月每天门诊入出院人次 echarts_4 BBoxAll
    initnumbyday=()=>{
        this.intervalId=setInterval(()=>{
            const res=getnumbyday()
            if(res){
                let days=mGetDate()
                let mons=[]
                let consultation=[]
                let emergency=[]
                let inhos=[]
                let outhos=[]
                days.map((item,key)=>{
                    mons.push(key+1)
                    if(res.m[key]){
                        consultation.push(res.m[key][0])
                    }else{
                        consultation.push(0)
                    }
                    if(res.e[key]){
                        emergency.push(res.e[key][0])
                    }else{
                        emergency.push(0)
                    }
                    if(res.key[key]){
                        inhos.push(res.key[key][0])
                    }else{
                        inhos.push(0)
                    }
                    if(res.o[key]){
                        outhos.push(res.o[key][0])
                    }else{
                        outhos.push(0)
                    }
                    return item
                })
                this.setState({
                    numbyday:{
                        mons:mons,
                        consultation:consultation,
                        emergency:emergency,
                        inhos:inhos,
                        outhos:outhos
                    }
                })
            }
        },1000 * 60 * 5)
    }
    
    //门诊医生负荷 echarts_31 BBoxAllSub
	initdoctorload=()=>{
        this.intervalId=setInterval(()=>{
            const res=getdoctorload()
            if(res){
                const cname=['诊室数','已接诊']
                const cvalue=[
                    {value:res.d, name:'诊室数'},
                    {value:res.c, name:'已接诊'}
                ] 
                const avg=res.c/res.d;
                const title='诊室负荷'
                const subtitle='平均每诊室接诊'+avg.toFixed(0)+'个患者'
                this.setState({
                    doctorload:{
                        cname:cname,
                        cvalue:cvalue,
                        title:title,
                        subtitle:subtitle
                    }
                })
            }
        },1000 * 60 * 5)
    }
    
    //门诊医生待诊 echarts_31 BBoxAllSub
	initdoctoratv=()=>{
        this.intervalId=setInterval(()=>{
            const res=getdoctoratv()
            if(res){
                const cname=['诊室数','待诊数']
                const cvalue=[
                    {value:res.d, name:'诊室数'},
                    {value:res.w, name:'待诊数'}
                ]
                const title='平均待诊数'
                let subtitle=''
                if(res.w>res.d){
                    const avg=res.w/res.d
                    subtitle='平均每诊室待诊'+avg.toFixed(0)+'个患者'
                }else{
                    const avg=res.d/res.w
                    subtitle='平均每'+avg.toFixed(0)+'诊室待诊1个患者'
                }
                this.setState({
                    doctoratv:{
                        cname:cname,
                        cvalue:cvalue,
                        title:title,
                        subtitle:subtitle
                    }
                })
            }
        },1000 * 60 * 5)
    }
    
    //就诊病人平均等待时间 echarts_31 BBoxAllSub
	initavgwaitingtime=()=>{
        this.intervalId=setInterval(()=>{
            const res=getavgwaitingtime()
            if(res){
                var cname=['1','2']
                var cvalue=[
                    {value:1, name:'1'},
                    {value:1, name:'2'}
                ]
                const title='平均等待:'+res+'分钟'
                const subtitle=title
                this.setState({
                    avgwaitingtime:{
                        cname:cname,
                        cvalue:cvalue,
                        title:title,
                        subtitle:subtitle
                    }
                })
            }
        },1000 * 60 * 5)
    }
    
    //三年收入对比
    initdisease=()=>{
        this.intervalId=setInterval(()=>{
            const res=getdisease()
            if(res){
                let cname=[]
                let cvalue=[]
                res.map((item,key)=>{
                    cname.push(res[key][0])
                    let dsub=[]
                    res[key].map((i,k)=>{
                        dsub.push(res[key][k])
                    })
                    cvalue.push(dsub)
                    return item
                })
                this.setState({
                    disease:{
                        cname:cname,
                        cvalue:cvalue,
                    }
                })
            }
        },1000 * 60 * 5)
    }
    
    //初始化医保类别费用比例 echarts_6 BBoxAll
    initmedinsu=()=>{
        this.intervalId=setInterval(()=>{
            const res=getmedinsu()
            if(res){
                let miamount=[]
                let sum=0
                res.map((item,key)=>{
                    let str={'value':res[key][0],'name':res[key][1]}
                    miamount.push(str)
                    sum+=Number(res[key][0])
                    return item
                })
                const medinsusum="合计:"+sum.toFixed(2)
                this.setState({
                    medinsu:{
                        medinsusum:medinsusum,
                        miamount:miamount
                    }
                })
            }
        },1000 * 60 * 5)
    }

    //初始化病人区域
    initMap=async()=>{
        const res=await getpatdis()
        let lpsdata=[]
        if(res){
            console.log(res)
            res.map((item,key)=>{
                var str={'name':res[key][1],'value':res[key][0]}
                lpsdata.push(str)
            })
        
            this.setState({
                lpsdata:lpsdata
            })
        }
    }
    
    componentDidMount(){
        /*this.initinhosnum()
        this.initnochecknum()
        this.initincomebythisday()
        this.initincomebythismon()
        this.initnumbyday()
        this.initdoctorload()
        this.initdoctoratv()
        this.initavgwaitingtime()
        this.initdisease()
        this.initmedinsu()
        this.initMap()*/
    }
    
    componentWillUnmount(){
        //clearInterval(this.intervalId)
    }
    
    render(){
        
        return(
            <Row justify={'center'} align={'top'} >
                <Col span={7}>
                    <Row>
                    <Col span={24}>
                    <BBoxAll 
                    title={'当日结账统计(元)'} 
                    sum={this.state.incomebythisday.incomebythisdaysum} 
                    echartoption={echartHistogram(this.state.incomebythisday.cname,this.state.incomebythisday.cvalue,'#2f89cf')}
                    />
                    </Col>
                    </Row>
                    <Row>
                    <Col span={24}>
                    <BBoxAll 
                    title={'本月结账统计(元)'} 
                    sum={this.state.incomebythismon.incomebythismonsum} 
                    echartoption={echartHistogram(this.state.incomebythismon.cname,this.state.incomebythismon.cvalue,'#27d08a')}
                    />
                    </Col>
                    </Row>
                    <Row>
                    <Col span={24}>
                    <BBoxAll 
                    title={'当月出院病人医保费用比例(元)'} 
                    sum={this.state.medinsu.medinsusum} 
                    echartoption={echartPie(this.state.medinsu.miamount)}
                    />
                    </Col>
                    </Row>
                </Col>
                <Col span={10}>
                    <Row>
                    <Col span={24}>
                    <BBar 
                    nowhosnum={this.state.nowhosnum}
                    inhosnum={this.state.inhosnum}
                    outhosnum={this.state.outhosnum}
                    ssnum={this.state.ssnum}
                    />
                    </Col>
                    </Row>
                    <Row>
                    <Col span={24}>
                    <BMap 
                    pznum={this.state.pznum}
                    jznum={this.state.jznum}
                    zznum={this.state.zznum}
                    nochecknum={this.state.nochecknum}
                    echartoption={echartLpsMap(this.state.lpsdata)}
                    />
                    </Col>
                    </Row>
                </Col>
                <Col span={7}>
                    <BBoxAll 
                    title={'本月门诊住院病人统计(人次)'} 
                    sum={false} 
                    echartoption={echartWaveform(this.state.numbyday.mons,this.state.numbyday.consultation,this.state.numbyday.emergency,this.state.numbyday.inhos,this.state.numbyday.outhos)}
                    />                    
	        		<BBoxAllSub 
                    title={''} 
                    sum={false} 
                    echartoptions={[
                        echartCircle(this.state.doctorload.cname,this.state.doctorload.cvalue,this.state.doctorload.title,this.state.doctorload.subtitle),
                        echartCircle(this.state.doctoratv.cname,this.state.doctoratv.cvalue,this.state.doctoratv.title,this.state.doctoratv.subtitle),
                        echartCircle(this.state.avgwaitingtime.cname,this.state.avgwaitingtime.cvalue,this.state.avgwaitingtime.title,this.state.avgwaitingtime.subtitle)
                    ]}
                    />
                    <BBoxAll 
                    title={'收入分析(元)'} 
                    sum={false} 
                    echartoption={echartMuHistogram(this.state.disease.cname,this.state.disease.cvalue)}
                    /> 
                </Col>
            </Row>
        )
    }
}
