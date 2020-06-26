import React,{Component} from 'react';

import {Card,Form,Input,Select,Button,Icon,DatePicker,message} from 'antd'
import BackBtn from '../../../../components/backbtn'
import PicsWall from './picswall'

import {couBook,rBookCategorys} from '../../../../api'
import {shortDate} from '../../../../utils/dateUtils'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const Item=Form.Item
const {Option}=Select
const {TextArea}=Input
const thisDate=shortDate(Date.now())

class AddOrUpdate extends Component{
    state={
        bookcategorys:[],
    }
    
    constructor(props){
        super(props)
        this.pw=React.createRef()
    }
    
    getBookCategorys=async ()=>{
        const result=await rBookCategorys()
        if(result.status===1){
            const bookcategorys=result.data
            this.setState({bookcategorys})            
        }
        
    }
    
    displayRender=(label)=> {
        return label[label.length - 1]
    }

    submit=()=>{
        this.props.form.validateFields(async(error,values)=>{
            if(!error){
                const {
                    create_time,
                    name,
                    isbn,
                    author,
                    publisher,
                    publisheryear,
                    price,
                    profile,
                    status,
                    bookcategory,
                }=values
                const cover=this.pw.current.getImgs()
                const book={
                    create_time,
                    name,
                    isbn,
                    author,
                    publisher,
                    publisheryear,
                    price,
                    profile,
                    status,
                    bookcategory,
                    cover
                }
                if(this.isUpdate){
                    book._id=this.book._id
                }
                const result=await couBook(book)
                if(result.status===1){
                    message.success(result.msg)
                    this.props.history.goBack()
                }else{
                    message.error(result.msg)
                }
            }
        })
    }
    
    componentWillMount(){
        this.getBookCategorys()
        const book=this.props.location.state
        this.isUpdate=!!book
        //{}空对象 避免undifine
        this.book=book ||{}
    }
    render(){
        const {bookcategorys}=this.state
        const {isUpdate,book}=this
        const {
            create_time,
            name,
            isbn,
            author,
            publisher,
            publisheryear,
            price,
            profile,
            bookcategory,
            cover
        }=book
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:4},
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
                    <Item label="入库时间">
                    {getFieldDecorator('create_time',{
                        initialValue:isUpdate ? moment(create_time,'YYYY-MM-DD') : moment(thisDate,'YYYY-MM-DD'),
                        rules:[
                        {
                            required:true,message:'入库时间不能为空!'
                        }
                        ]
                    })(
                        <DatePicker/>
                    )}
                    </Item>
                    <Item label="图书类别">
                    {getFieldDecorator('bookcategory',{
                        initialValue:isUpdate ? bookcategory._id : 1,
                        rules:[
                        {
                            required:true,message:'图类别不能为空!'
                        }
                        ]
                    })(
                        <Select>
                        {
                            bookcategorys.map(pc=><Option key={pc._id} value={pc._id}>{pc.name}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
                    <Item label="书名">
                    {getFieldDecorator('name',{
                        initialValue:isUpdate ? name :'',
                        rules:[
                        {
                            required:true,message:'书名不能为空!'
                        }
                        ]
                    })(
                        <Input placeholder='请输入书名!'/>
                    )}
                    </Item>
                    <Item label="isbn">
                    {getFieldDecorator('isbn',{
                        initialValue:isUpdate ? isbn : ''
                    })(
                        <Input placeholder='请输入isbn!'/>
                    )}
                    </Item>
                    <Item label="作者">
                    {getFieldDecorator('author',{
                        initialValue:isUpdate ? author : ''
                    })(
                        <Input placeholder='请输入作者!'/>
                    )}
                    </Item>
                    <Item label="出版社">
                    {getFieldDecorator('publisher',{
                        initialValue:isUpdate ? publisher : ''
                    })(
                        <Input placeholder='请输入出版社!'/>
                    )}
                    </Item>
                    <Item label="出版时间">
                    {getFieldDecorator('publisheryear',{
                        initialValue:isUpdate ? publisheryear : ''
                    })(
                        <Input placeholder='请输入出版时间（年）!'/>
                    )}
                    </Item>
                    <Item label="价格">
                    {getFieldDecorator('price',{
                        initialValue:isUpdate ? price : ''
                    })(
                        <Input placeholder='请输入价格!'/>
                    )}
                    </Item>
                    <Item label="简介" labelCol={{span:4}} wrapperCol={{span:20}}>
                    {getFieldDecorator('profile',{
                        initialValue:isUpdate ? profile : ''
                    })(
                         <TextArea placeholder='' autoSize={{minRows:2,maxRows:6}}/>
                    )}
                    </Item>
                    <Item label="封面">
                        <PicsWall ref={this.pw} cover={cover}/>
                    </Item>
                    <Item>
                        <Button type='primary' onClick={this.submit}><Icon type="save"/>提交</Button>&nbsp;&nbsp;
                        <Button type='danger'><Icon type="close" />取消</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
export default Form.create()(AddOrUpdate)