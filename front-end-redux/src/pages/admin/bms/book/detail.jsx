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
    }
    
    getstateDisplay=()=>{
        const {status}=this.props.location.state.book
        const stateDisplay=status==='1'? (
            <Badge color={BASE_RED} text="借出" />
        ) :(
            <Badge color={BASE_BLUE} text="未借出" />
        )
        this.setState({stateDisplay})
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
    }

    render(){
        const {
            create_time,
            name,
            isbn,
            profile,
            bookcategory,
            cover
        }=this.props.location.state.book

        const {previewImage,previewVisble,stateDisplay}=this.state
        const title=(
            <span>
                <BackBtn onClick={()=>this.props.history.goBack()}/>
                <span>详情</span>
            </span>
        )
        const icreate_time=(<span>入库时间</span>)
        const istateDisplay=(<span>借阅状态</span>)
        const ibookcategory=(<span>图书类别</span>)
        const iname=(<span>书名</span>)
        const iprofile=(<span>图书简介</span>)
        const iisbn=(<span>isbn</span>)
        const ipic=(<span>封面图片</span>)
        return(
            <Card title={title}>
              <Descriptions bordered>
                <Item label={icreate_time} span={2}>{formateDate(create_time)}</Item>
                <Item label={istateDisplay}>{stateDisplay}</Item>
                <Item label={ibookcategory} >{bookcategory.name}</Item>
                <Item label={iisbn}>{isbn}</Item>
                <Item label={iname}>{name}</Item>
                <Item label={iprofile} span={3}>{profile}</Item>
                <Item label={ipic} span={3}>
                {
                    cover ? cover.split(',').map(img=>(
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