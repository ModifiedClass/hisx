const reqDepartments={
    "status":"0",
    "data":[{
        "_id":"1",
        "name":"level1",
        "code":"l",
        "parent_id":"0",
        "create_time":"2020-01-30",
        "children":[{
            "_id":"11",
            "name":"level11",
            "parent_id":"1",
            "create_time":"2020-01-30",
            "code":"l1"
        },{
            "_id":"12",
            "name":"level12",
            "parent_id":"1",
            "create_time":"2020-01-30",
            "code":"12"
        }]
    },{
        "_id":"2",
        "name":"level2",
        "code":"2",
        "parent_id":"0",
        "create_time":"2020-01-30",
        "children":[{
            "_id":"21",
            "name":"level21",
            "parent_id":"2",
            "create_time":"2020-01-30",
            "code":"21",
            "children":[{
                "_id":"211",
                "name":"level211",
                "parent_id":"21",
                "create_time":"2020-01-30",
                "code":"2l1"
            }]
        },{
            "_id":"22",
            "name":"level22",
            "parent_id":"2",
            "create_time":"2020-01-30",
            "code":"22"
        }]
    },{
        "_id":"3",
        "name":"level3",
        "parent_id":"0",
        "create_time":"2020-01-30",
        "code":"3"
    }]
}

export default reqDepartments