import React,{Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'

import './index.less'

import Home from './home'
import AddOrUpdate from './addorupdate'
import Detail from './detail'

export default class Book extends Component{
    
    render(){
        return(
            <Switch>
                <Route path='/book' component={Home} exact/>
                <Route path='/book/addorupdate' component={AddOrUpdate}/>
                <Route path='/book/detail' component={Detail}/>
                <Redirect to='/book' />
            </Switch>
        )
    }
}