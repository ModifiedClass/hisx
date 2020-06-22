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
} from './account-reducer'

import { chartsmanage } from './analysis-reducer'
import { timelinemanage } from './timeline-reducer'

export default combineReducers({
    depmanage,
    breadCrum,
    user,
    groupmanage,
    usermanage,
    timelinemanage,
    chartsmanage,
})