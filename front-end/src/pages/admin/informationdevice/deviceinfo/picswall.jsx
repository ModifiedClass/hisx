import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Upload,Icon,Modal,message} from 'antd'

import {BASE_IMG_URL} from '../../../../utils/constants'

export default class PicsWall extends Component{
    
    static proTypes={
        imgs:PropTypes.array
    }
    state={
        previewVisble:false,//显示大图
        previewImage:'', //大图
        fileList:[]
    }
    
    constructor(props){
        super(props)
        let fileList=[]
        const {imgs}=this.props
        if(imgs&&imgs.length>0){
            fileList=imgs.map((img,index)=>({
                    uid:-index,
                    name:img,
                    statur:'done',
                    url:BASE_IMG_URL+img
                }
            ))
        }
        this.state={
            previewVisble:false,//显示大图
            previewImage:'', //大图
            fileList
        }
    }
    //已上传图片数组
    getImgs=()=>{
        return this.state.fileList.map(file=>file.name)
    }
    
    handleCancel=()=>this.setState({previewVisble:false})
    handlePreview=file=>{
        this.setState({
            previewImage:file.url||file.thumbUrl,
            previewVisble:true,
        })
    }
    handleChange=({file,fileList})=>{
        if(file.status==='done'){
            const result=file.response
            if(result.status===0){
                message.success('上传成功!')
                const {name,url}=result.data
                file=fileList[fileList.length-1]
                file.name=name
                file.url=url
            }else{
                message.error('上传失败!')
            }
            
        }else if(file.status==='remove'){
            /*const result=await reqDeleteImg(file.name)
            if(result.status===0){
                message.success('删除成功!')
            }else{
                message.error('删除失败!')
            }*/
        }
        this.setState({fileList})
        }
    
    render(){
        const {previewImage,previewVisble,fileList}=this.state
        const uploadButton=(
            <div>
                <Icon type="plus"/>
                <div>上传</div>
            </div>
        )
        return(
            <div>
                <Upload
                 action='/upload'//django后台https://blog.csdn.net/jjw_zyfx/article/details/95944471
                 accept='image/*'
                 name='image'
                 listType='picture-card'
                 fileList={fileList}
                 onPreview={this.handlePreview}
                 onChange={this.handleChange}
                >
                {fileList.length>=3?null:uploadButton}
                </Upload>
                <Modal visible={previewVisble} footer={null} onCancel={this.handleCancel}>
                    <img alt='' style={{width:'100%'}} src={previewImage}/>
                </Modal>
            </div>
        )
    }
}
