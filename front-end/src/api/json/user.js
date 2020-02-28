const reqUsers={
    "status":"0",
    "data":{
        "users":[{
            "department":['11','12','21','22','3'],
            "_id":"1",
            "username":"root",
            "password":"l1",
            "group_id":"1",
            "create_time":"2020-02-15"
        },{
            "_id":"2",
            "username":"test",
            "password":"l1",
            "group_id":"2",
            "create_time":"2020-02-15"
        }],
        "groups":[{
            "menu":['/dashboard',
                '/auth',
                '/group',
                '/department',
                '/user'],
            "_id":"1",
            "name":"admin",
            "create_time":"2020-02-02"
        },{
            "menu":[],
            "_id":"2",
            "name":"everyone",
            "create_time":"2020-02-15"
        }]
    }
}

export default reqUsers