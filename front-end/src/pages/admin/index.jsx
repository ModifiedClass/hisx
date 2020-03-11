import React,{Component} from 'react';
import {Redirect,BrowserRouter,Route,Switch} from 'react-router-dom'
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
import NotFound from '../status/404'

const { Header, Footer, Sider, Content } = Layout;

class Admin extends Component{
    render(){
        const user=this.props.user
        /*if(!user||!user._id){
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
                                <Redirect exact from='/admin' to='/admin/dashboard' />
                                <Route path='/admin/dashboard' component={Dashboard}/>
                                <Route path='/admin/group' component={Group}/>
                                <Route path='/admin/department' component={Department}/>
                                <Route path='/admin/user' component={User}/>
                                <Route path='/admin/problemcategory' component={ProblemCategory}/>
                                <Route path='/admin/processedrecord' component={ProcessedRecord}/>
                                <Route path='/admin/timeline' component={TimeLine}/>
                                <Route path='/admin/devicecategory' component={DeviceCategory}/>
                                <Route path='/admin/devicemodel' component={DeviceModel}/>
                                <Route path='/admin/installlocation' component={InstallLocation}/>
                                <Route path='/admin/deviceinfo' component={DeviceInfo}/>
                                <Route path='/admin/developing' component={Developing}/>
                                <Route component={NotFound}/>
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
    state=>({user:state.user}),
    {}
)(Admin)