import React,{Component} from 'react';
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout } from 'antd';
import {connect} from 'react-redux'

import './index.less'

//import memUtils from '../../utils/memUtils'
import SiderBar from '../../components/siderbar'
import HeaderBar from '../../components/headerbar'
import BreadCrumBar from '../../components/breadcrumbbar'
import FooterBar from '../../components/footerbar'
import Dashboard from './dashboard'
import Group from './account/group'
import Department from './account/department'
import User from './account/user'
import Developing from './developing'
import ProblemCategory from './oapm/problemcategory'
import ProcessedRecord from './oapm/processedrecord'
import TimeLine from './timeline'
import DeviceCategory from './informationdevice/devicecategory'
import DeviceModel from './informationdevice/devicemodel'
import InstallLocation from './informationdevice/installlocation'
import DeviceInfo from './informationdevice/deviceinfo'

const { Header, Footer, Sider, Content } = Layout;

class Admin extends Component{
    render(){
        /*const user=this.props.user
        if(!user||!user._id){
            return <Redirect to='/login'/>
        }*/
        return(
            <Layout className="layout-main">
                <Header className="layout-main-top">
                    <HeaderBar />
                </Header>
                <Layout className="layout-main-bottom">
                    <Sider className="layout-main-bottom-left">
                        <SiderBar />
                    </Sider>
                    <Layout className="layout-main-bottom-right">
                        <Content className="layout-main-bottom-right-content">
                            <BreadCrumBar className="layout-main-bottom-right-content-bcb"/>
                            <Switch>
                                <Route exact path='/' component={Dashboard}/>
                                <Route path='/dashboard' component={Dashboard}/>
                                <Route path='/group' component={Group}/>
                                <Route path='/department' component={Department}/>
                                <Route path='/user' component={User}/>
                                <Route path='/problemcategory' component={ProblemCategory}/>
                                <Route path='/processedrecord' component={ProcessedRecord}/>
                                <Route path='/timeline' component={TimeLine}/>
                                <Route path='/devicecategory' component={DeviceCategory}/>
                                <Route path='/devicemodel' component={DeviceModel}/>
                                <Route path='/installlocation' component={InstallLocation}/>
                                <Route path='/deviceinfo' component={DeviceInfo}/>
                                <Route path='/developing' component={Developing}/>
                                <Redirect to='/developing' />
                            </Switch>
                        </Content>
                        <Footer className="layout-main-bottom-right-footer" >
                            <FooterBar />
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}
export default connect(
    state=({user:state.user}),
        {}
)(Admin)