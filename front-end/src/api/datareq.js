import axios from 'axios'
import {message} from 'antd'

export function axiosreq(url,data={},method='GET'){
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
    
}

const csrftoken=()=fetchreq(HOST+'/api/account/get_token/')

obj2String=(obj, arr = [], idx = 0)=>{
    for(let item in obj) {
        arr[idx++] = [item, obj[item]]
    }
    return new URLSearchParams(arr).toString()
}
export fetchreq=(url,data={},method='GET')=>{
    const searchStr = obj2String(data)
    let opt={}
    if(method === 'GET'){
        url += '?' + searchStr
        opt={
            method: method.toUpperCase(),
            credentials:'include',
            headers: new Headers({
                'X-csrftoken':csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        }
    }else{
        let data=JSON.stringify(data);
        opt={
            method: method.toUpperCase(),
            mode:'cors',
            credentials:'include',
            body:data,
            headers: new Headers({
                'X-csrftoken':csrftoken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            })
        };
    }
    
    fetch(url,opt)
        .then(res=>res.json())
        .then(res=>{
            return res;
        })
        .catch(err=>{message.error(err)})
}