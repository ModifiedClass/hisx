import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'

import './index.less'

import Home from './home'
import AddOrUpdate from './addorupdate'
import Detail from './detail'

export default class DeviceInfo extends Component{
    
    render(){
        return(
            <Switch>
                <Route path='/deviceinfo' component={Home} exact/>
                <Route path='/deviceinfo/addorupdate' component={AddOrUpdate}/>
                <Route path='/deviceinfo/detail' component={Detail}/>
                <Redirect to='/deviceinfo' />
            </Switch>
        )
    }
}