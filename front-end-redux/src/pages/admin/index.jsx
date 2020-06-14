import React,{Component} from 'react';
import {Redirect,Route,Switch} from 'react-router-dom'
import { Layout,message } from 'antd';
import {connect} from 'react-redux'

import './index.less'

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
import ApplicationSoftWare from './oapm/applicationsoftWare'
import PrinterRepair from './oapm/printerrepair'
import Cartriday from './oapm/cartriday'
import TimeLine from './timeline'
import DeviceCategory from './informationdevice/devicecategory'
import DeviceModel from './informationdevice/devicemodel'
import InstallLocation from './informationdevice/installlocation'
import DeviceInfo from './informationdevice/deviceinfo'
import Zlqk from './analysis/zlqk'
import Zdqk from './analysis/zdqk'
import TableSpace from './tools/tablespace'
import LockTables from './tools/locktables'
import Setting from './setting'
import BookCategory from './bms/bookcategory'
import Book from './bms/book'
import BookStock from './bms/bookstock'
import BorrowRecord from './bms/borrowrecord'
import NotFound from '../status/404'
import {logout} from '../../redux/actions/account'

const { Header, Footer, Sider, Content } = Layout;

class Admin extends Component{

    render(){
        const user=this.props.user
        if(!user||!user._id){
            return <Redirect to='/login'/>
        }
        if(!user.menus){
            this.props.logout()
        }
        const menus=user.menus
        const username=user.username
        let path=this.props.location.pathname
        if(path.indexOf('/processedrecord')===0){
            path='/processedrecord'
        }
        if(path.indexOf('/deviceinfo')===0){
            path='/deviceinfo'
        }
        if(username!=='admin'&&!menus.includes(path)&&path!=='/'){
            message.error('没有权限！')
            return <Redirect to='/dashboard'/>
        }
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
                                <Redirect exact from='/' to='/dashboard' />
                                <Route path='/dashboard' component={Dashboard}/>
                                <Route path='/group' component={Group}/>
                                <Route path='/department' component={Department}/>
                                <Route path='/user' component={User}/>
                                <Route path='/problemcategory' component={ProblemCategory}/>
                                <Route path='/processedrecord' component={ProcessedRecord}/>
                                <Route path='/applicationsoftWare' component={ApplicationSoftWare}/>
                                <Route path='/printerrepair' component={PrinterRepair}/>
                                <Route path='/cartriday' component={Cartriday}/>
                                <Route path='/timeline' component={TimeLine}/>
                                <Route path='/devicecategory' component={DeviceCategory}/>
                                <Route path='/devicemodel' component={DeviceModel}/>
                                <Route path='/installlocation' component={InstallLocation}/>
                                <Route path='/deviceinfo' component={DeviceInfo}/>
                                <Route path='/zlqk' component={Zlqk}/>
                                <Route path='/zdqk' component={Zdqk}/>
                                <Route path='/tablespace' component={TableSpace}/>
                                <Route path='/locktables' component={LockTables}/>
                                <Route path='/setting' component={Setting}/>
                                <Route path='/bookcategory' component={BookCategory}/>
                                <Route path='/book' component={Book}/>
                                <Route path='/bookstock' component={BookStock}/>
                                <Route path='/borrowrecord' component={BorrowRecord}/>
                                <Route path='/developing' component={Developing}/>
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
    {logout}
)(Admin)