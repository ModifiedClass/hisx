export function formateDate(time){
    if(!time) return ''
    let date=new Date(time)
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds() 
}

export function shortDate(time){
    if(!time) return ''
    let date=new Date(time)
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
}

//获取当月号数
export function mGetDate(){
     var date = new Date()
     var year = date.getFullYear()
     var month = date.getMonth()+1
     var d = new Date(year, month, 0)
     return d.getDate()
}		