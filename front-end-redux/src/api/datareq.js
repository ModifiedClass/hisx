//const csrftoken=()=>{fetch(HOST+'/account/get_token/')}

const obj2String=(obj, arr = [], idx = 0)=>{
    for(let item in obj) {
        arr[idx++] = [item, obj[item]]
    }
    return new URLSearchParams(arr).toString()
}

const fetchreq=(url,data={},method='GET')=>{
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
    return new Promise((resolve,reject)=>{
        fetch(url,opt)
        .then(res=>res.json())
        .then(res=>{
            //resolve( eval('(' + res + ')') )
            resolve(JSON.parse(res))
        }).catch(error=>{
            console.log(error.message)
        })
    })  
}
export default fetchreq