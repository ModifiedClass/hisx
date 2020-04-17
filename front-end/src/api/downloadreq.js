import {message} from 'antd'
const obj2String=(obj, arr = [], idx = 0)=>{
    for(let item in obj) {
        arr[idx++] = [item, obj[item]]
    }
    return new URLSearchParams(arr).toString()
}
const fetchdownload=async(url,data={})=>{
    let opt={}
    url += '?' + obj2String(data)
    opt={
        method:'GET',
        credentials:'include',
        headers: new Headers({
            //'X-csrftoken':csrftoken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    }
    const obj=await fetch(url,opt)
        .then(res=>res.blob()
        .then(blob=>{
            //return res
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            const fileName = res.headers.get('Content-Disposition').split('=')[1]
            a.download = decodeURIComponent(fileName)
            a.click()
        }))
        .catch(err=>{message.error(err)})
    return obj;
}
export default fetchdownload