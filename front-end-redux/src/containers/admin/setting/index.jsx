import React,{Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {Form,Card,Button,Icon,message} from 'antd'
import {dbb,cnl} from '../../../redux/actions/setting-action'
import {
    ACCESS_LOG_PATH,
    ERROR_LOG_PATH,
    DB_BACKUP_PATH
} from '../../../utils/constants'

const Item=Form.Item

class Setting extends Component{
    
    /*clearSession=async()=>{
        const result=await delovertimesession()
        message.success(result.msg)
    }*/
    
    dbBackup=async()=>{
        await this.props.dbb(DB_BACKUP_PATH)
        const result=this.props.settingReducer
        message.success(result.msg)
    }
    
    clearAccessLog=async()=>{
        await this.props.cnl(ACCESS_LOG_PATH)
        const result=this.props.settingReducer
        message.success(result.msg)
    }
    
    clearErrorLog=async()=>{
        await this.props.cnl(ERROR_LOG_PATH)
        const result=this.props.settingReducer
        message.success(result.msg)
    }
    
    render(){
        const formItemLayout={
            labelCol:{span:3},
            wrapperCol:{span:16}
        }
        return(
            <Card>
                <Form {...formItemLayout}>
                    <Item label="数据备份">
                        <Button type='primary' onClick={this.dbBackup}><Icon type="export" />备份</Button>
                    </Item>
                    <Item label="清理日志">
                        <Button type='primary' onClick={this.clearAccessLog}><Icon type="file" />访问日志</Button>&nbsp;&nbsp;
                        <Button type='primary' onClick={this.clearErrorLog}><Icon type="file" />错误日志</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

Setting.propTypes={
    settingReducer:PropTypes.object.isRequired,
    dbb:PropTypes.func.isRequired,
    cnl:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        settingReducer:state.settingReducer,
    }
}

const mapDispatchToProps = {dbb,cnl}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Setting)