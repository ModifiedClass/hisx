import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Login from './pages/login'
import Home from './pages/home'
import Admin from './pages/admin'



export default class App extends Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/admin' component={Admin}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Home}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
