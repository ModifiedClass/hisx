import React,{Component} from 'react';
import {Row,Col } from 'antd'

import ChartTableSpace from './chart-tablespace'
import {getzlhists,gettjxtts} from '../../../../api'


export default class TableSpace extends Component{
    state={
        hisdata:[],
        tjxtdata:[],
    }
    initHisData=async()=>{
        const hisres=await getzlhists()
        if(hisres){
            const hisdata=[]
            for (let d in hisres){
                hisdata.push({'name':hisres[d][0],'value':hisres[d][1]})
            }
            this.setState({
                hisdata
            })
        }
    }

    initTjxtData=async()=>{
        const tjxtres=await gettjxtts()
            if(tjxtres){
            const tjxtdata=[]
            for (let d in tjxtres){
                tjxtdata.push({'name':tjxtres[d][0],'value':tjxtres[d][1]})
            }
            this.setState({
                tjxtdata
            })
        }
    }
    
    componentWillMount(){
        this.initHisData()
        this.initTjxtData()
    }
    render(){
        const{hisdata,tjxtdata}=this.state
        const histitle='中联his表空间使用情况'  
        const tjxttitle='体检系统表空间使用情况'        
        return(
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={24}>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <ChartTableSpace data={hisdata} title={histitle} thisname={his}/>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                        <ChartTableSpace data={tjxtdata} title={tjxttitle} thisname={tjxt}/>
                    </Col>
                </Row>
            </div>
        )
    }
}