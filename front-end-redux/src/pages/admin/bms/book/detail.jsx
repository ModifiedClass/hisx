import React,{Component} from 'react';

import {Card,Descriptions,Empty,Modal} from 'antd'
import {BASE_IMG_URL} from '../../../../utils/constants'
import BackBtn from '../../../../components/backbtn'
import {formateDate} from '../../../../utils/dateUtils'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const Item=Descriptions.Item

export default class ProcessedRecordDetail extends Component{
    state={
        previewVisble:false,//显示大图
        previewImage:'', //大图
    }

    handleCancel=()=>this.setState({previewVisble:false})
    
    //预览
    handlePreview=img=>{
        this.setState({
            previewImage:BASE_IMG_URL+img,
            previewVisble:true,
        })
    }

    render(){
        const {
            create_time,
            name,
            author,
            publisher,
            publisheryear,
            price,
            isbn,
            profile,
            bookcategory,
            cover
        }=this.props.location.state.book

        const {previewImage,previewVisble}=this.state
        const title=(
            <span>
                <BackBtn onClick={()=>this.props.history.goBack()}/>
                <span>详情</span>
            </span>
        )

        return(
            <Card title={title}>
              <Descriptions bordered>
                <Item label='入库时间' span={2}>{formateDate(create_time)}</Item>
                <Item label='图书类别' >{bookcategory.name}</Item>
                <Item label='书名'>{name}</Item>
                <Item label='isbn'>{isbn}</Item>
                <Item label='作者'>{author}</Item>
                <Item label='出版社'>{publisher}</Item>
                <Item label='出版时间'>{publisheryear}</Item>
                <Item label='价格'>{price}</Item>
                <Item label='图书简介' span={3}>{profile}</Item>
                <Item label='封面图片' span={3}>
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