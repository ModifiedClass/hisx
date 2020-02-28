import React,{Component} from 'react';

import {Card,Form,Input,Select,Cascader,Button,Icon,DatePicker} from 'antd'
import BackBtn from '../../../../components/backbtn'
import PicsWall from './picswall'
import RichTextEditor from './richtexteditor'

import reqCascaderDepartments from '../../../../api/json/cascaderdepartment.js'
import reqUsers from '../../../../api/json/user.js'
import reqProblemCategorys from '../../../../api/json/problemcategory.js'
import {shortDate} from '../../../../utils/dateUtils'
import {problemState,processingMode} from '../../../../config/selectConfig'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const Item=Form.Item
const Option=Select.Option
const {TextArea}=Input
const thisDate=shortDate(Date.now())

class AddOrUpdate extends Component{
    state={
        options:[],
    }
    
    constructor(props){
        super(props)
        this.pw=React.createRef()
        this.editor=React.createRef()
    }
    getDepartments=async (parentId)=>{
        //const result=await reqDepartments(parentId)
        const result=reqCascaderDepartments
        if(result.status==='0'){
            const departments=result.data
            this.setState({options:departments})            
        }
        
    }
    
    submit=()=>{
        this.props.form.validateFields((error,values)=>{
            if(!error){
                const {name}=values
                const imgs=this.pw.current.getImgs()
                const solution=this.editor.current.getSolution()
                const processedrecord={
                    name,solution,imgs
                }
                if(this.isUpdate){
                    processedrecord._id=this.processedrecord._id
                }
                /*const result=await reqAddOrUpdatePro
                if(result.status===0){
                    message.success()
                    this.props.history.goBack()
                }else{
                    message.error()
                }*/
            }
        })
    }
    
    componentDidMount(){
        this.getDepartments('0')
    }
    
    componentWillMount(){
        const processedrecord=this.props.location.state
        this.isUpdate=!!processedrecord
        //{}空对象 避免undifine
        this.processedrecord=processedrecord ||{}
    }
    render(){
        const {isUpdate,processedrecord}=this
        const {create_time,
            problem_state,
            imgs,
            solution
        }=processedrecord
        //级联id数组
        /*const {departmentId}=processedrecord        
        const departmentIds=[]
        if(isUpdate){
            departmentIds.push()
        }*/
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:2},
            wrapperCol:{span:8}
        }

        const title=(
            <span>
                <BackBtn onClick={()=>this.props.history.goBack()}/>
                <span>{isUpdate ? '更新记录':'新增记录'}</span>
            </span>
        )
        return(
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="记录时间">
                    {getFieldDecorator('create_time',{
                        initialValue:isUpdate ? moment(create_time,'YYYY-MM-DD') : moment(thisDate,'YYYY-MM-DD'),
                        rules:[
                        {
                            required:true,message:'记录时间不能为空!'
                        }
                        ]
                    })(
                        <DatePicker/>
                    )}
                    </Item>
                    <Item label="问题状态">
                    {getFieldDecorator('problem_state',{
                        initialValue:isUpdate ? problem_state :'1',
                        rules:[
                        {
                            required:true,message:'问题状态不能为空!'
                        }
                        ]
                    })(
                        <Select>
                        {
                            problemState.map(ps=><Option key={ps.value} value={ps.value}>{ps.label}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
                    <Item label="发生部门">
                    {getFieldDecorator('department',{
                        initialValue:['2','21','211'],
                        rules:[
                        {
                            required:true,message:'发生部门不能为空!'
                        }
                        ]
                    })(
                        <Cascader 
                        options={this.state.options}
                        placeholder="请选择部门!"
                        />
                    )}
                    </Item>
                    <Item label="发现人">
                    {getFieldDecorator('discoverer',{
                        initialValue:isUpdate ? processedrecord.discoverer : '2',
                        rules:[
                        {
                            required:true,message:'发现人不能为空!'
                        }
                        ]
                    })(
                        <Select>
                        {
                            reqUsers.data.users.map(ru=><Option key={ru._id} value={ru._id}>{ru.username}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
                    <Item label="问题类别">
                    {getFieldDecorator('problem_category',{
                        initialValue:isUpdate ? processedrecord.problem_category : '1',
                        rules:[
                        {
                            required:true,message:'问题类别不能为空!'
                        }
                        ]
                    })(
                        <Select>
                        {
                            reqProblemCategorys.data.map(pc=><Option key={pc._id} value={pc._id}>{pc.name}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
                    <Item label="处理方式">
                    {getFieldDecorator('processing_mode',{
                        initialValue:isUpdate ? processedrecord.processing_mode : '2',
                        rules:[
                        {
                            required:true,message:'处理方式不能为空!'
                        }
                        ]
                    })(
                        <Select>
                        {
                            processingMode.map(pm=><Option key={pm.value} value={pm.value}>{pm.label}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
                    <Item label="处理人">
                    {getFieldDecorator('handler',{
                        initialValue:isUpdate ? processedrecord.handler : '2',
                        rules:[
                        {
                            required:true,message:'处理人不能为空!'
                        }
                        ]
                    })(
                        <Select>
                        {
                            reqUsers.data.users.map(ru=><Option key={ru._id} value={ru._id}>{ru.username}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
                    <Item label="问题情况">
                    {getFieldDecorator('situation',{
                        initialValue:isUpdate ? processedrecord.situation : '病人预结或结账提示有项目未对码',
                        rules:[
                        {
                            required:true,message:'问题情况不能为空!'
                        }
                        ]
                    })(
                        <TextArea placeholder='' autoSize={{minRows:2,maxRows:6}}/>
                    )}
                    </Item>
                    <Item label="解决办法" labelCol={{span:2}} wrapperCol={{span:20}}>
                    {getFieldDecorator('solution',{
                        initialValue:isUpdate ? processedrecord.solution : '医保管理-医保项目管理-对码',
                        rules:[
                        {
                            required:true,message:'解决办法不能为空!'
                        }
                        ]
                    })(
                        <RichTextEditor ref={this.editor} solution={solution}/>
                    )}
                    </Item>
                    <Item label="相关图片">
                        <PicsWall ref={this.pw} imgs={imgs}/>
                    </Item>
                    <Item>
                        <Button type='primary'><Icon type="save" onClick={this.submit}/>提交</Button>&nbsp;&nbsp;
                        <Button type='danger'><Icon type="close" />取消</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
export default Form.create()(AddOrUpdate)