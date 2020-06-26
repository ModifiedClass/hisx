/*
根据旧state和action生成返回新state
*/
import {combineReducers} from 'redux'
import {
    departmentReducer,
    breadCrum,
    user,
    groupReducer,
    userReducer
} from './account-reducer'

import { chartsReducer } from './analysis-reducer'
import { timelineReducer } from './timeline-reducer'

export default combineReducers({
    departmentReducer,
    breadCrum,
    user,
    groupReducer,
    userReducer,
    timelineReducer,
    chartsReducer,
})