/*
根据旧state和action生成返回新state
*/
import {combineReducers} from 'redux'
import {
    depmanage,
    breadCrum,
    user,
    groupmanage,
    usermanage
} from './account'

import { chartsmanage } from './analysis'
import { timelinemanage } from './timeline'

export default combineReducers({
    depmanage,
    breadCrum,
    user,
    groupmanage,
    usermanage,
    timelinemanage,
    chartsmanage,
})