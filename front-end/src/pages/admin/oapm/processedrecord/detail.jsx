import React,{Component} from 'react';

import {Card,Icon,Descriptions, Badge,Empty} from 'antd'
import {BASE_GREEN,BASE_RED,BASE_BLUE} from '../../../../utils/colors'
import {BASE_IMG_URL} from '../../../../utils/constants'
import BackBtn from '../../../../components/backbtn'

const Item=Descriptions.Item

export default class ProcessedRecordDetail extends Component{
    state={
        stateDisplay:''
    }
     
    componentDidMount(){
        const {problem_state}=this.props.location.state.processedrecord
         /*const result=await reqState(pstateId)
         const pstate=result.data.name
         this.setState({pstate})*/
         
        const stateDisplay=problem_state==='1' ? (
            <Badge color={BASE_RED} text="待处理" />
        ) :(problem_state==='2' ? (
            <Badge color={BASE_GREEN} text="已处理" />
        ):(
            <Badge color={BASE_BLUE} text="需跟进" />
        ))
        this.setState({stateDisplay})
    }
    /*
    HashRouter
    卸载之前清楚保存数据
    componentDidUnMount(){
        memUtils.processedrecord={}
    }
    */
    render(){
        const {create_time,
        situation,
        solution,
        processing_mode,
        departmentId,
        discoverer,
        problem_category,
        handler,
        pics
        }=this.props.location.state.processedrecord
        /*
        HashRouter
        const {create_time,
        situation,
        solution,
        processing_mode,
        departmentId,
        discoverer,
        problem_category,
        handler,
        pics
        }=memUtils.processedrecord
        */
        const {stateDisplay}=this.state
        const title=(
            <span>
                <BackBtn onClick={()=>this.props.history.goBack()}/>
                <span>记录详情</span>
            </span>
        )
        const icreate_time=(<span><Icon type="clock-circle"/>&nbsp;记录时间</span>)
        const istateDisplay=(<span><Icon type="sync" />&nbsp;问题状态</span>)
        const idepartmentId=(<span><Icon type="apartment"/>&nbsp;发生部门</span>)
        const idiscoverer=(<span><Icon type="user"/>&nbsp;发现人</span>)
        const iproblem_category=(<span><Icon type="cluster" />&nbsp;问题类别</span>)
        const iprocessing_mode=(<span><Icon type="share-alt" />&nbsp;处理方式</span>)
        const ihandler=(<span><Icon type="user"/>&nbsp;处理人</span>)
        const isituation=(<span><Icon type="solution" />&nbsp;问题情况</span>)
        const isolution=(<span><Icon type="check-square" />&nbsp;解决办法</span>)
        const ipic=(<span><Icon type="file-image"/>&nbsp;相关图片</span>)
        return(
            <Card title={title}>
              <Descriptions bordered>
                <Item label={icreate_time} span={2}>{create_time}</Item>
                <Item label={istateDisplay}>{stateDisplay}</Item>
                <Item label={idepartmentId} span={2}>{departmentId}</Item>
                <Item label={idiscoverer}>{discoverer}</Item>
                <Item label={iproblem_category}>{problem_category}</Item>
                <Item label={iprocessing_mode}>{processing_mode}</Item>
                <Item label={ihandler}>{handler}</Item>
                <Item label={isituation} span={3}>{situation}</Item>
                <Item label={isolution} span={3}><span dangerouslySetInnerHTML={{__html:solution}}></span></Item>
                <Item label={ipic} span={3}>
                {
                    pics ? pics.map(img=>(
                            <img
                           key={img}
                            className="processedrecord-img"
                            src={BASE_IMG_URL+img}
                            alt="img"/>
                        )
                    ):<Empty />
                }
                </Item>
              </Descriptions>
            </Card>  
        )
    }
}