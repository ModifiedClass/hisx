export function ptoc(data){
        let resData = data.slice()
        let tree = []

        for (let i = 0; i < resData.length; i++) {
            if (resData[i]._parent === null) {
                let obj = {
                    _id: resData[i]._id,
                    value: resData[i]._id,
                    key: resData[i]._id,
                    name: resData[i].name,
                    title: resData[i].name,
                    code: resData[i].code,
                    create_time: resData[i].create_time,
                    status: resData[i].status,
                    _parent: resData[i]._parent,
                    children: []
                }
                tree.push(obj)
                resData.splice(i, 1)
                i--
            }
        }
        
        run(tree)
        function run(chiArr){
            if (resData.length !== 0) {
                for (let i = 0; i < chiArr.length; i++) {
                    for (let j = 0; j < resData.length; j++) {
                        if (chiArr[i]._id === resData[j]._parent) {
                            let obj = {
                                _id: resData[j]._id,
                                key: resData[j]._id,
                                value: resData[j]._id,
                                title: resData[j].name,
                                name: resData[j].name,
                                code: resData[j].code,
                                create_time: resData[j].create_time,
                                status: resData[j].status,
                                _parent: resData[j]._parent,
                                children: []
                            }
                            chiArr[i].children.push(obj)
                            resData.splice(j, 1)
                            j--
                        }
                    }
                    run(chiArr[i].children)
                }
            }
        }
        return tree;
    }
