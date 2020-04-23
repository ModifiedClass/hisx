import React,{PureComponent} from 'react';
import PropTypes from 'prop-types'

import {Form,Select,DatePicker} from 'antd'
import {rDeviceModels,rDeviceCategorys,rDeviceInfos} from '../../../../api'
import {shortDate} from '../../../../utils/dateUtils'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const Item=Form.Item
const Option=Select.Option
const thisDate=shortDate(Date.now())

class AddForm extends PureComponent{

    static propTypes={
        setForm:PropTypes.func.isRequired,
        printerrepair:PropTypes.object
    }
    
    state={
        devicecategorys:[],
        devicemodels:[],
        deviceinfos:[]
    }
    //初始化设备类别
    initDeviceCategorys=async()=>{
        this.setState({devicecategorys:[]})
        const result=await rDeviceCategorys()
        if(result.status===1){
            this.setState({devicecategorys:result.data})
        }
    }
    //根据类别初始化select型号
    getDM=async value =>{
        this.setState({devicemodels:[]})
        const result=await rDeviceModels({'devicecategory':value})
        if(result.status===1){
            this.setState({devicemodels:result.data})
        }  
    }
    //根据型号id初始化select设备
    getDeviceInfos=async value =>{
        this.setState({deviceinfos:[]})
        const result=await rDeviceInfos({'isPage':false,'devicemodel_id':value})
        if(result.status===1){
            this.setState({deviceinfos:result.data.list})
        }  
    }
    
    componentWillMount(){
        this.initDeviceCategorys()
        this.props.setForm(this.props.form)
    }
    
    render(){
        const {devicecategorys,devicemodels,deviceinfos}=this.state
        const {printerrepair,users}=this.props
        const {getFieldDecorator}=this.props.form
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:15}
        }
        return(
            <Form {...formItemLayout}>
                <Item label="类别">
                {
                getFieldDecorator('devicecategory')
                (
                    <Select onChange={this.getDM}>
                        {
                            devicecategorys.map(ps=><Option key={ps._id} value={ps._id}>{ps.name}</Option>)
                        }
                    </Select>
                    )
                }
                </Item>
                <Item label="型号">
                {
                getFieldDecorator('devicemodel')
                (
                    <Select onChange={this.getDeviceInfos}>
                        {
                            devicemodels.map(ps=><Option key={ps._id} value={ps._id}>{ps.name}</Option>)
                        }
                    </Select>
                    )
                }
                </Item>
                <Item label='设备' >
                {
                    getFieldDecorator('printer',{
                        initialValue:printerrepair.printer,
                        rules:[
                        {required:true,message:'设备不能为空!'}
                        ]
                    })(
                        <Select>
                        {
                            deviceinfos.map(item=><Option key={item._id} value={item._id}>{item.sn}</Option>)
                        }
                        </Select>
                    )
                }
                </Item>
                <Item label="处理时间">
                    {getFieldDecorator('create_time',{
                        initialValue:printerrepair.create_time ? moment(printerrepair.create_time,'YYYY-MM-DD') : moment(thisDate,'YYYY-MM-DD'),
                        rules:[
                        {
                            required:true,message:'处理时间不能为空!'
                        }
                        ]
                    })(
                        <DatePicker/>
                    )}
                </Item>
                <Item label="处理人员">
                    {getFieldDecorator('handler',{
                        initialValue:printerrepair.handler,
                        rules:[
                        {
                            required:true,message:'处理人员不能为空!'
                        }
                        ]
                    })(
                        <Select>
                        {
                            users.map(ru=><Option key={ru._id} value={ru._id}>{ru.username}{ru.name}</Option>)
                        }
                        </Select>
                    )}
                    </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)