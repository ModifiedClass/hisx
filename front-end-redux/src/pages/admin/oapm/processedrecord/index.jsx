import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'

import './index.less'

import Home from './home'
import AddOrUpdate from './addorupdate'
import Detail from './detail'

export default class ProcessedRecord extends Component{
    
    render(){
        return(
            <Switch>
                <Route path='/processedrecord' component={Home} exact/>
                <Route path='/processedrecord/addorupdate' component={AddOrUpdate}/>
                <Route path='/processedrecord/detail' component={Detail}/>
                <Redirect to='/processedrecord' />
            </Switch>
        )
    }
}