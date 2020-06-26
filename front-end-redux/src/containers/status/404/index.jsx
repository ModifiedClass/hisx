import React,{Component} from 'react'
import {Row,Col,Button} from 'antd'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {setBreadCrum} from '../../../redux/actions/account-action'
import './index.less'

class NotFound extends Component {

    goDashboard=()=>{
        this.props.setBreadCrum('仪表盘')
        this.props.history.replace('/dashboard')
    }

    render(){
        
        return(
            <Row className="not-found">
                <Col span={11} className="not-found-left"></Col>
                <Col span={13} className="not-found-right">
                    <h1>ERROR</h1>
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

NotFound.propTypes={
    setBreadCrum:PropTypes.func.isRequired
}

const mapStateToProps = null

const mapDispatchToProps =  {setBreadCrum}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotFound)
