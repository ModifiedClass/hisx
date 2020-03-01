import React,{Component} from 'react'
import {Row,Col,Button} from 'antd'
import {connect} from 'react-redux'

import {setBreadCrum} from '../../../redux/actions'
import './index.less'

class NotFound extends Component {
    goDashboard=()=>{
            this.props.setBreadCrum('仪表盘')
            this.props.history.replace('/dashboard')
        }
    render(){
        
        return(
            <Row className="not-found">
                <Col span={12} className="not-found-left"></Col>
                <Col span={12} className="not-found-right">
                    <h1>404</h1>
                    <h2>抱歉,您访问的页面不存在.</h2>
                    <div>
                        <Button type='primart' onClick={this.goDashboard}>
                            回到首页
                        </Button>
                    </div>
                </Col>
            </Row>
        )
    }
}
export default connect(
    null,
    {setBreadCrum}
)(NotFound)
