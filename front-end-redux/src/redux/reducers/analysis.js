
//管理chart
export const chartsmanage=(state={},action)=>{
    if(action.type){
        return {
            ...state,
            data:action.data
        }
    }else{
        return state
    }
}
