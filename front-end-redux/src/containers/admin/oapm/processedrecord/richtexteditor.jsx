import React,{Component} from 'react';

import PropTypes from 'prop-types'
import {EditorState,convertToRaw,ContentState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichTextEditor extends Component{
    static propTypes={
        solution:PropTypes.string
    }
    state={
        editorState:EditorState.createEmpty()
    }
    constructor(props){
        super(props)
        const html=this.props.solution
        if(html){
            const contentBlock=htmlToDraft(html)
            if(contentBlock){
                const contentState=ContentState.createFromBlockArray(contentBlock.contentBlocks)
                const editorState=EditorState.createWithContent(contentState)
                this.state={
                    editorState
                }
            }
        }else{
            this.state={
                editorState:EditorState.createEmpty()
            }
            const html='<p>医保管理-医保项目管理-对码</p>'
            const contentBlock=htmlToDraft(html)
            if(contentBlock){
                const contentState=ContentState.createFromBlockArray(contentBlock.contentBlocks)
                const editorState=EditorState.createWithContent(contentState)
                this.state={
                     editorState
                }
            }
        }
    }
    
    onEditorStateChange=(editorState)=>{
        this.setState({
            editorState
        })
    }
    
    getSolution=()=>{
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    
    upLoadImageCallBack=(file)=>{
        return new Promise(
            (resolve,reject)=>{
                const xhr=new XMLHttpRequest()
                xhr.open('POST','/oapm/img/upload')
                const data=new FormData()
                data.append('image',file)
                xhr.send(data)
                xhr.addEventListener('load',()=>{
                    const response=JSON.parse(xhr.reponseText)
                    const url=response.data.url
                    resolve({data:{link:url}})
                })
                xhr.addEventListener('error',()=>{
                    const error=JSON.parse(xhr.responseText)
                    reject(error)
                })
            }
        )
    }
    
    render(){
        const {editorState}=this.state
        return(
            <div>
            <Editor 
            editorState={editorState}
            editorStyle={{border:'1px solid #CCCCCC',minHeight:200,paddingLeft:10}}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
                image:{uploadCallback:this.upLoadImageCallBack,alt:{present:true,mandatory:true}}
            }}/>
            {/*<textarea disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />*/}
            </div>
        )
    }
}