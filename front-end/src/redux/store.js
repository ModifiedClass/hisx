/*

*/
import{createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
//import {componseWithDevTools} from 'redux-devtools-extension'

import reducer from './reducer'

export default createStore(reducer,applyMiddleware(thunk))