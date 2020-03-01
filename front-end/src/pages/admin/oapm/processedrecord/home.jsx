import React,{Component} from 'react';
import {Card,Select,Input,Button,Modal,Icon,Table,message,Tooltip,Tag} from 'antd'

import {BASE_GREEN,BASE_RED,BASE_BLUE} from '../../../../utils/colors'
import EditBtn from '../../../../components/editbtn'
import DeleteBtn from '../../../../components/deletebtn'
import PreviewBtn from '../../../../components/previewbtn'
import {formateDate} from '../../../../utils/dateUtils'
import {PAGE_SIZE} from '../../../../utils/constants'
//import {reqProcessedRecords} from '../../../../../api'
import reqProcessedRecords from '../../../../api/json/processedrecord.js'

const Option=Select.Option
const { Search } = Input

export default class Home extends Component{
    state={
        processedrecords:[],
        total:0,
        loading:false,
        isShow:false,
        searchName:'',  //搜素关键字
        searchType:''    //搜素类型
    }
    
    initColums=()=>{
        this.columns=[
        {
            title:'记录时间',
            dataIndex:'create_time',
            width: 150,
            render:(create_time)=>formateDate(create_time)
        },
        {
            title:'问题情况',
            dataIndex:'situation',
            width: 250,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 250,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow:'ellipsis',
                        cursor:'pointer'
                    }
                }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
            title:'解决办法',
            dataIndex:'solution',
            width: 250,
            onCell: () => {
                return {
                    style: {
                        maxWidth: 250,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow:'ellipsis',
                        cursor:'pointer'
                    }
                }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        },
        {
            title:'处理方式',
            dataIndex:'processing_mode',
            width: 150,
        },
        {
            title:'问题状态',
            width: 100,
            dataIndex:'problem_state',
            render:(problem_state)=>{
                if(problem_state==='0'){
                    return (
                        <span>
                            <Tag color={BASE_RED}>待处理</Tag>
                        </span>
                    )
                }else if(problem_state==='1'){
                    return (
                        <span>
                            <Tag color={BASE_GREEN}>已处理</Tag>
                        </span>
                    )
                }else{
                    return (
                        <span>
                            <Tag color={BASE_BLUE}>需跟进</Tag>
                        </span>
                    )
                }
                
                
            }
        },
        {
            title:'发生部门',
            dataIndex:'departmentId',
            width: 200,
        },
        {
            title:'发现人',
            dataIndex:'discoverer',
            width: 80,
        },
        {
            title:'问题类别',
            dataIndex:'problem_category',
            width: 200,
        },        
        {
            title:'处理人',
            width: 80,
            dataIndex:'handler',
        },          
        {
            title:'操作',
            fixed: 'right',
            width: 150,
            render:(processedrecord)=>(
            <span>
                //使用HashRouter<PreviewBtn onClick={()=>this.showDetail(processedrecord)}/>
                <PreviewBtn onClick={()=>this.props.history.push('/processedrecord/detail',{processedrecord})}/>&nbsp;
                <EditBtn onClick={()=>this.props.history.push('/processedrecord/addorupdate',processedrecord)}/>&nbsp;
                <DeleteBtn onClick={()=>this.deleteProcessedRecord(processedrecord)}/>
            </span>
            )
        }
        ]
    }
    /*
    //使用HashRouter
    showDetail=(processedrecord)=>{
        nemUtils.processedrecord=processedrecord
        this.props.history.push('/processedrecord/detail')
    }*/
    getProcessedRecords= async(pageNum)=>{
        /*this.pageNum=pageNum
        this.setState({loading:true})
        const{searchName,searchType}=this.state
        let result
        if(searchName){
            result=reqProcessedRecords({
                pageNum,
                pageSize:PAGE_SIZE,
                searchName,
                searchType
                })
        }else{
            result=await reqProcessedRecords(pageNum,PAGE_SIZE)
        }
        
        this.setState({loading:false})
        if(result.status===0){
        const {total,list}=result.data
            this.setState(processedrecords:list,total)
        }else{
            message.error("获取数据失败!")
        }*/
        const processedrecords=reqProcessedRecords.data
        this.setState({processedrecords})
    }

    showAdd=()=>{
        this.processedrecord=null
        this.setState({isShow:true})
    }
    
    showUpdate=(processedrecord)=>{
        this.processedrecord=processedrecord
        this.setState({isShow:true})
    }
    
    addOrUpdateProcessedRecord=()=>{
        this.form.validateFields(async(err,values)=>{
            if(!err){
                this.setState({isShow:false})
                const processedrecord=values
                this.form.resetFields()
                if(this.processedrecord){
                    processedrecord.id=this.processedrecord._id
                }
                /*const result=await reqAddorUpdateUser(processedrecord)
                if(result.status===9){
                    message.success('${this.processedrecord? '新增':'编辑'}成功')
                    this.getProcessedRecords()
                }else{
                    message.error(result.msg)
                }*/
                console.log(processedrecord)
            }
        })
    }
    
    deleteProcessedRecord=(processedrecord)=>{
        Modal.confirm({
            title:'确认删除'+processedrecord.name+'吗？',
            onOk:async()=>{
                /*const result=await reqdeleteProcessedRecord(processedrecord._id)
                if(result.status===0){
                    message.success('删除成功！')
                    this.getProcessedRecords()
                }*/
                message.error(processedrecord.name)
            }
        })
    }
   
    componentWillMount(){
        this.initColums()
    }
    componentDidMount(){
        this.getProcessedRecords()
    }
    
    render(){
        const {processedrecords,total,loading,searchName,searchType}=this.state
        const title=<Button type='primary' onClick={()=>this.props.history.push('/processedrecord/addorupdate')}><Icon type='unordered-list'/>新增</Button>
        
        const extra=(
        <span className="searchbar">
            <Select 
            value={searchType} 
            className="searchbar-select" 
            onChange={value=>this.setState({searchType:value})}
            >
                <Option value='situation'>问题情况</Option>
                <Option value='solution'>解决办法</Option>
            </Select>
            <Search 
            className="searchbar-search" 
            placeholder="搜索关键字" 
            value={searchName} 
            onChange={event => this.setState({searchName:event.target.value})} 
            onSearch={()=>this.getProcessedRecords(1)}
            enterButton />
        </span>
        )
        return(
            <Card title={title} extra={extra}>
                <Table
                bordered
                rowKey='_id'
                loading={loading}
                dataSource={processedrecords}
                columns={this.columns}
                scroll={{ x: 1000 }}
                pagination={{
                    current:this.pageNum,
                    defaultPageSize:PAGE_SIZE,
                    ShowQuickJumper:true,
                    total,
                    onChange:this.getProcessedRecords
                    }}
                />
            </Card>
        )
    }
}