import {
    GET_BOOKCATEGORY,
    COU_BOOKCATEGORY,
    DEL_BOOKCATEGORY,
    GET_BOOK,
    COU_BOOK,
    DEL_BOOK,
    GET_BOOKSTOCK,
    COU_BOOKSTOCK,
    DEL_BOOKSTOCK,
    GET_BORROWRECORD,
    COU_BORROWRECORD,
    DEL_BORROWRECORD,
    RETURN_BOOK
} from '../actiontypes'

//管理图书类别
export const bookcategoryReducer=(state={},action)=>{
    switch(action.type){
        case GET_BOOKCATEGORY:
            return {
                ...state,
                data:action.data
            }
        case COU_BOOKCATEGORY:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_BOOKCATEGORY:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}
//管理图书
export const bookReducer=(state={},action)=>{
    switch(action.type){
        case GET_BOOK:
            return {
                ...state,
                data:action.data
            }
        case COU_BOOK:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_BOOK:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}
//管理图书库存
export const bookstockReducer=(state={},action)=>{
    switch(action.type){
        case GET_BOOKSTOCK:
            return {
                ...state,
                data:action.data
            }
        case COU_BOOKSTOCK:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_BOOKSTOCK:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}
//管理借阅记录
export const borrowrecordReducer=(state={},action)=>{
    switch(action.type){
        case GET_BORROWRECORD:
            return {
                ...state,
                data:action.data
            }
        case COU_BORROWRECORD:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case DEL_BORROWRECORD:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        case RETURN_BOOK:
            return {
                ...state,
                msg:action.msg,
                status:action.status
            }
        default:
            return state
    }
}