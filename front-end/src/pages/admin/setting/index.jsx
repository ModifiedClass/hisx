import React,{Component} from 'react';

import {Form,Card,Button,Icon,message} from 'antd'
import {
    delovertimesession,
    database_backup,
    clear_nginxlog
} from '../../../api'
import {
    ACCESS_LOG_PATH,
    ERROR_LOG_PATH,
    DB_BACKUP_PATH
} from '../../../utils/constants'

const Item=Form.Item

export default class Setting extends Component{
    
    /*clearSession=async()=>{
        const result=await delovertimesession()
        message.success(result.msg)
    }*/
    
    dbBackup=async()=>{
        const result=await database_backup(DB_BACKUP_PATH)
        message.success(result.msg)
    }
    
    clearAccessLog=async()=>{
        const result=await clear_nginxlog(ACCESS_LOG_PATH)
        message.success(result.msg)
    }
    
    clearErrorLog=async()=>{
        const result=await clear_nginxlog(ERROR_LOG_PATH)
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