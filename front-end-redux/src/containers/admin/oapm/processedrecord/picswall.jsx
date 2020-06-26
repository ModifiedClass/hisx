import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Upload,Icon,Modal,message} from 'antd'

import {BASE_IMG_URL,FILELIST_LENGTH} from '../../../../utils/constants'

export default class PicsWall extends Component{
    
    static proTypes={
        imgs:PropTypes.array
    }
    
    constructor(props){
        super(props)
        let fileList=[]
        const {imgs}=this.props
        if(imgs&&imgs.length>0){
            let imgarr=imgs.split(',')
            fileList=imgarr.map((ia,index)=>({
                    uid:-index,
                    name:ia,
                    statur:'done',
                    url:BASE_IMG_URL+ia
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
        //return this.state.fileList.map(file=>file.name)
        let obj=''
        this.state.fileList.map(file=>
            obj+=file.name+','
        )
        return obj.substring(0,obj.length-1)
    }
    
    handleCancel=()=>this.setState({previewVisble:false})
    
    //预览
    handlePreview=file=>{
        this.setState({
            previewImage:file.url||file.thumbUrl,
            previewVisble:true,
        })
    }
    handleChange=({file,fileList})=>{
        if(file.status==='done'){
            const result=file.response
            if(result.status===1){
                message.success('上传成功!')
                const {data}=result
                file=fileList[fileList.length-1]
                file.name=data[0]
                file.url=data[2]
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
                 action='/api/oapm/img/'
                 accept='image/*'
                 name='image'
                 listType='picture-card'
                 fileList={fileList}
                 onPreview={this.handlePreview}
                 onChange={this.handleChange}
                >
                {fileList.length>=FILELIST_LENGTH?null:uploadButton}
                </Upload>
                <Modal width='80%' visible={previewVisble} footer={null} onCancel={this.handleCancel}>
                    <img alt='' style={{width:'auto'}} src={previewImage}/>
                </Modal>
            </div>
        )
    }
}
