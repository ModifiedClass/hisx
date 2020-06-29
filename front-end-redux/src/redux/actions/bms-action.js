/*
包含多个action creator函数的模块
同步action: 对象{type:'',data:}
异步action: 函数dispatch=>{}
*/
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

import {
    rBookCategorys,
    couBookCategory,
    dBookCategory,
    rBooks,
    couBook,
    dBook,
    rBookStocks,
    couBookStock,
    dBookStock,
    rBorrowRecords,
    couBorrowRecord,
    dBorrowRecord
} from '../../api'

//获取图书类别
const rBookCategorysAction = data =>({
    type:GET_BOOKCATEGORY,
    data
})
export const rBcs = () => async dispatch => {
    const result = await rBookCategorys()
    if(result.status === 1){
        dispatch(rBookCategorysAction(result.data))
    }
  }

//新增修改图书类别
const couBookCategoryAction = (msg,status) =>({
    type:COU_BOOKCATEGORY,
    msg,
    status
})
export const couBc = bookcategory => async dispatch=>{
    const result=await couBookCategory(bookcategory)
    dispatch(couBookCategoryAction(result.msg,result.status))
}

//删除图书类别
const dBookCategoryAction = (msg,status) =>({
    type:DEL_BOOKCATEGORY,
    msg,
    status
})
export const dBc = bookcategoryId => async dispatch=>{
    const result = await dBookCategory(bookcategoryId)
    dispatch(dBookCategoryAction(result.msg,result.status))
}
//获取图书
const rBooksAction = data =>({
    type:GET_BOOK,
    data
})
export const rBis = () => async dispatch => {
    const result = await rBooks()
    if(result.status === 1){
        dispatch(rBooksAction(result.data))
    }
  }

//新增修改图书
const couBookAction = (msg,status) =>({
    type:COU_BOOK,
    msg,
    status
})
export const couBi = book => async dispatch=>{
    const result=await couBook(book)
    dispatch(couBookAction(result.msg,result.status))
}

//删除图书
const dBookAction = (msg,status) =>({
    type:DEL_BOOK,
    msg,
    status
})
export const dBi = bookId => async dispatch=>{
    const result = await dBook(bookId)
    dispatch(dBookAction(result.msg,result.status))
}
//获取图书库存
const rBookStocksAction = data =>({
    type:GET_BOOKSTOCK,
    data
})
export const rBss = () => async dispatch => {
    const result = await rBookStocks()
    if(result.status === 1){
        dispatch(rBookStocksAction(result.data))
    }
  }

//新增修改图书库存
const couBookStockAction = (msg,status) =>({
    type:COU_BOOKSTOCK,
    msg,
    status
})
export const couBs = bookstock => async dispatch=>{
    const result=await couBookStock(bookstock)
    dispatch(couBookStockAction(result.msg,result.status))
}

//删除图书库存
const dBookStockAction = (msg,status) =>({
    type:DEL_BOOKSTOCK,
    msg,
    status
})
export const dBs = bookstockId => async dispatch=>{
    const result = await dBookStock(bookstockId)
    dispatch(dBookStockAction(result.msg,result.status))
}
//获取借阅记录
const rBorrowRecordsAction = data =>({
    type:GET_BORROWRECORD,
    data
})
export const rBrs = () => async dispatch => {
    const result = await rBorrowRecords()
    if(result.status === 1){
        dispatch(rBorrowRecordsAction(result.data))
    }
  }

//新增修改借阅记录
const couBorrowRecordAction = (msg,status) =>({
    type:COU_BORROWRECORD,
    msg,
    status
})
export const couBr = borrowrecord => async dispatch=>{
    const result=await couBorrowRecord(borrowrecord)
    dispatch(couBorrowRecordAction(result.msg,result.status))
}

//删除借阅记录
const dBorrowRecordAction = (msg,status) =>({
    type:DEL_BORROWRECORD,
    msg,
    status
})
export const dBr = borrowrecordId => async dispatch=>{
    const result = await dBorrowRecord(borrowrecordId)
    dispatch(dBorrowRecordAction(result.msg,result.status))
}
//还书
const rBorrowRecordAction = (msg,status) =>({
    type:RETURN_BOOK,
    msg,
    status
})
export const rBr = borrowrecordId => async dispatch=>{
    const result = await dBorrowRecord(borrowrecordId)
    dispatch(rBorrowRecordAction(result.msg,result.status))
}