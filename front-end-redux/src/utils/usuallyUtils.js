//汉字转拼音首字母
export function getPYCode(str) {
    let result = ""
    for (let i = 0; i < str.length; i++) {
        result += getPY(str.charAt(i).toString())
    }
    return result
}
export function getPY(s) {
    if (s != "") {
        let tmp=s.charCodeAt()
        //tmp = 65536 + tmp
        let py = ""
        if (tmp >= 45217 && tmp <= 45252) {
            py = "A"
        } else if (tmp >= 45253 && tmp <= 45760) {
            py = "B"
        } else if (tmp >= 45761 && tmp <= 46317) {
            py = "C"
        } else if (tmp >= 46318 && tmp <= 46825) {
            py = "D"
        } else if (tmp >= 46826 && tmp <= 47009) {
            py = "E"
        } else if (tmp >= 47010 && tmp <= 47296) {
            py = "F"
        } else if ((tmp >= 47297 && tmp <= 47613) || (tmp == 63193)) {
            py = "G"
        } else if (tmp >= 47614 && tmp <= 48118) {
            py = "H"
        } else if (tmp >= 48119 && tmp <= 49061) {
            py = "J"
        } else if (tmp >= 49062 && tmp <= 49323) {
            py = "K"
        } else if (tmp >= 49324 && tmp <= 49895) {
            py = "L"
        } else if (tmp >= 49896 && tmp <= 50370) {
            py = "M"
        } else if (tmp >= 50371 && tmp <= 50613) {
            py = "N"
        } else if (tmp >= 50614 && tmp <= 50621) {
            py = "O"
        } else if (tmp >= 50622 && tmp <= 50905) {
            py = "P"
        } else if (tmp >= 50906 && tmp <= 51386) {
            py = "Q"
        } else if (tmp >= 51387 && tmp <= 51445) {
            py = "R"
        } else if (tmp >= 51446 && tmp <= 52217) {
            py = "S"
        } else if (tmp >= 52218 && tmp <= 52697) {
            py = "T"
        } else if (tmp >= 52698 && tmp <= 52979) {
            py = "W"
        } else if (tmp >= 52980 && tmp <= 53688) {
            py = "X"
        } else if (tmp >= 53689 && tmp <= 54480) {
            py = "Y"
        } else if (tmp >= 54481 && tmp <= 62289) {
            py = "Z"
        } else {
            py = s.charAt(0)
        }
        return py
    }
}
//去除父菜单，只留叶子菜单
//参数：所有菜单对象，带父菜单的待处理菜单数组
export function getLeaveNode(menuList,pmenus){
    const delkeys=[]
    if(pmenus){
        for(let i=0;i<pmenus.length;i++){
            for(let j=0;j<menuList.length;j++){
                if(menuList[j].children&&menuList[j].key==pmenus[i]){
                    delkeys.push(pmenus[i])
                }
            }
        }
        for(let i=0;i<delkeys.length;i++){
            let index = pmenus.indexOf(delkeys[i])
            if(index>-1){
                pmenus.splice(index, 1)
            }
        }
    }
    return pmenus
}

//根据叶子菜单得到父菜单与叶子菜单数组
export function getParentAndLeave(menuList,menus){
    if(menus){
        const pkey=[]
        for(let i=0;i<menuList.length;i++){
            if(menuList[i].children){
                for(let j=0;j<menuList[i].children.length;j++){
                    for(let k=0;k<menus.length;k++){
                        if(menus[k]===menuList[i].children[j].key){
                            pkey.push(menuList[i].key)
                        }
                    }
                }
            }
        }
        const uniquePkey=Array.from(new Set(pkey))
        menus.push(uniquePkey)
    }
    return menus
}