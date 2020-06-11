import React,{Component} from 'react';

import {Card,Icon,Descriptions, Badge,Empty,Modal} from 'antd'
import {BASE_GREEN,BASE_RED,BASE_BLUE} from '../../../../utils/colors'
import {BASE_IMG_URL} from '../../../../utils/constants'
import BackBtn from '../../../../components/backbtn'
import {processingMode} from '../../../../config/selectConfig'
import {formateDate} from '../../../../utils/dateUtils'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const Item=Descriptions.Item

export default class ProcessedRecordDetail extends Component{
    state={
        previewVisble:false,//显示大图
        previewImage:'', //大图
        stateDisplay:'',
        processing_modeDisplay:''
    }
    
    getstateDisplay=()=>{
        const {problem_state}=this.props.location.state.processedrecord
        const stateDisplay=problem_state===1 ? (
            <Badge color={BASE_RED} text="待处理" />
        ) :(problem_state===2 ? (
            <Badge color={BASE_GREEN} text="已处理" />
        ):(
            <Badge color={BASE_BLUE} text="需跟进" />
        ))
        this.setState({stateDisplay})
    }
    
    getprocessingModeDisplay=()=>{
        const {processing_mode}=this.props.location.state.processedrecord
        processingMode.forEach(pm=>{
            if(processing_mode.toString()===pm.value){
                this.setState({processing_modeDisplay:pm.label})
            }
        })
    }
    
    handleCancel=()=>this.setState({previewVisble:false})
    
    //预览
    handlePreview=img=>{
        this.setState({
            previewImage:BASE_IMG_URL+img,
            previewVisble:true,
        })
    }
    
    componentDidMount(){
        this.getstateDisplay()
        this.getprocessingModeDisplay()
    }
    /*
    HashRouter
    卸载之前清除保存数据
    componentDidUnMount(){
        memUtils.processedrecord={}
    }
    */
    render(){
        const {
            create_time,
            situation,
            solution,
            department,
            discoverer,
            problem_category,
            handler,
            imgs
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
        let departmentNames=''
        department.forEach(dep=>{
            departmentNames+=dep.name+'/'
        })
        const {previewImage,previewVisble,stateDisplay,processing_modeDisplay}=this.state
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
                <Item label={icreate_time} span={2}>{formateDate(create_time)}</Item>
                <Item label={istateDisplay}>{stateDisplay}</Item>
                <Item label={idepartmentId} span={2}>{departmentNames.substring(0,departmentNames.length-1)}</Item>
                <Item label={idiscoverer}>{discoverer?discoverer.name:''}</Item>
                <Item label={iproblem_category}>{problem_category.name}</Item>
                <Item label={iprocessing_mode}>{processing_modeDisplay}</Item>
                <Item label={ihandler}>{handler.name}</Item>
                <Item label={isituation} span={3}>{situation}</Item>
                <Item label={isolution} span={3}><span dangerouslySetInnerHTML={{__html:solution}}></span></Item>
                <Item label={ipic} span={3}>
                {
                    imgs ? imgs.split(',').map(img=>(
                            <a key={img} onClick={()=>{this.handlePreview(img)}}>
                            <img
                            key={img}
                            className="processedrecord-img"
                            src={BASE_IMG_URL+img}
                            alt="img"/>
                            </a>
                        )
                    ):<Empty />
                }
                </Item>
              </Descriptions>
              <Modal width='80%' visible={previewVisble} footer={null} onCancel={this.handleCancel}>
                    <img alt='' style={{width:'auto'}} src={previewImage}/>
                </Modal>
            </Card>  
        )
    }
}