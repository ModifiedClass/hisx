import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

import Login from './pages/login'
import Visualization from './pages/visualization'
import Admin from './pages/admin'



export default class App extends Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/admin' component={Admin}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={Visualization} exact></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
