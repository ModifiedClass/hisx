import React,{Component} from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom'

//import Login from './pages/login/index.jsx'
//import Home from './pages/home'
import Admin from './pages/admin'



export default class App extends Component{
    render(){
        return (
            <BrowserRouter>
                <Switch>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )
    }
}
