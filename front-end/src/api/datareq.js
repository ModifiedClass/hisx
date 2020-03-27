//import axios from 'axios'
import {message} from 'antd'
//import {HOST} from '../utils/constants'
/*export function axiosreq(url,data={},method='GET'){
    return new Promise((resolve,reject)=>{
        let promise
        if(method==='GET'){
           promise = axios.get(url,{
                params:data
                })
        }else{
            promise = axios.post(url,data)
        }
        promise.then(response=>{
            resolve(response.data)
        }).catch(error=>{
            message.error(error.message)
        })
    })
    
}*/

//const csrftoken=()=>{fetch(HOST+'/account/get_token/')}

const obj2String=(obj, arr = [], idx = 0)=>{
    for(let item in obj) {
        arr[idx++] = [item, obj[item]]
    }
    return new URLSearchParams(arr).toString()
}
const fetchreq=async(url,data={},method='GET')=>{
    let opt={}
    if(method === 'GET'){
        url += '?' + obj2String(data)
        opt={
            method: method.toUpperCase(),
            credentials:'include',
            headers: new Headers({
                //'X-csrftoken':csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }
    }else{
        let para=JSON.stringify(data);
        opt={
            method: method.toUpperCase(),
            mode:'cors',
            credentials:'include',
            body:para,
            headers: new Headers({
                //'X-csrftoken':csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };
    }
    const obj=await fetch(url,opt)
        .then(res=>res.json())
        .then(res=>{
            return eval('(' + res + ')')
        })
        .catch(err=>{message.error(err)})
    return obj;
}
export default fetchreq