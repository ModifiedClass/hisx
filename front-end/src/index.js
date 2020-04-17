import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './redux/store'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'core-js/es'  
import 'react-app-polyfill/ie9'  
import 'react-app-polyfill/stable'

//import storeUtils from './utils/storeUtils'
//import memUtils from './utils/memUtils'

//const user=storeUtils.getUser()
//memUtils.user=user

ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>), document.getElementById('root'));
serviceWorker.unregister();
