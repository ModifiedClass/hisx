
//管理chart
export const chartsReducer=(state={},action)=>{
    if(action.type){
        return {
            ...state,
            data:action.data
        }
    }else{
        return state
    }
}
