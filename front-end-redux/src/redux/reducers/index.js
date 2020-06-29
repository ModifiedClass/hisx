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

import { 
    applicationSoftwareReducer,
    problemCategoryReducer,
    processedRecordReducer,
    printerRepairReducer,
    cartridayReducer
 } from './oapm-reducer'

import { 
    devicecategoryReducer,
    devicemodelReducer,
    installlocationReducer,
    deviceinfoReducer,
} from './informationdevice-reducer'

import { settingReducer } from './setting-reducer'

import { toolsReducer } from './tools-reducer'

import { 
    bookcategoryReducer,
    bookReducer,
    bookstockReducer,
    borrowrecordReducer,
} from './bms-reducer'

export default combineReducers({
    departmentReducer,
    breadCrum,
    user,
    groupReducer,
    userReducer,
    timelineReducer,
    chartsReducer,
    applicationSoftwareReducer,
    problemCategoryReducer,
    processedRecordReducer,
    printerRepairReducer,
    cartridayReducer,
    devicecategoryReducer,
    devicemodelReducer,
    installlocationReducer,
    deviceinfoReducer,
    settingReducer,
    toolsReducer,
    bookcategoryReducer,
    bookReducer,
    bookstockReducer,
    borrowrecordReducer,
})