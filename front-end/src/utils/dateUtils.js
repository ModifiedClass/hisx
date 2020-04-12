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

export function formateYear(time){
    if(!time) return ''
    let date=new Date(time)
    return date.getFullYear()
}

//获取当月号数
export function mGetDate(){
     var date = new Date()
     var year = date.getFullYear()
     var month = date.getMonth()+1
     var d = new Date(year, month, 0)
     return d.getDate()
}

export function get30Days(){
    function addDate(dd,dadd){
        var a = new Date(dd)
        a = a.valueOf()
        a = a + dadd * 24 * 60 * 60 * 1000
        a = new Date(a)
        return a
    }
    var now = new Date();
    var dataTitle = [];//保存获取到的日期
    for(let i=0;i<30;i++){
        var year=now.getFullYear()
        var month = (now.getMonth()+1)<10?'0'+(now.getMonth()+1).toString():(now.getMonth()+1)
        dataTitle[i]=(year+"-"+month+"-"+now.getDate())
        now = addDate(month+"/"+now.getDate()+"/"+now.getFullYear(),-1)
    }
    return dataTitle.reverse()
}