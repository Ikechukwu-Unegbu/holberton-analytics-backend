# Admin Dashboard APIs

## Get All Users
    Make a get request to this endpoint
    url: 'https://domainname/admin/users',
    Method: 'GET',
    Headers: 'Accept: application/json',
    Bearer Token: - Token
### Response 
    {
        "users": [
            {
                "_id": "6484603b9a8d71285d12463f",
                "fullname": "Ikechukwu Vincent",
                "username": "Vincent",
                "email": "mr.ikunegbu@gmail.com",
                "createdAt": "2023-06-10T11:36:27.361Z",
                "updatedAt": "2023-06-10T11:36:27.361Z",
                "__v": 0
            },
            {
                "_id": "648460b59a8d71285d124643",
                "fullname": "Lucia Chinenye",
                "username": "Lucia",
                "email": "Lucia@gmail.com",
                "createdAt": "2023-06-10T11:38:29.281Z",
                "updatedAt": "2023-06-10T11:38:29.281Z",
                "__v": 0
            },
            {
                "_id": "6484c535ee30364f0a5bb33a",
                "fullname": "Ikechukwu Unegbu",
                "username": "Vinike",
                "email": "iunegbu94@yahoo.com",
                "createdAt": "2023-06-10T18:47:17.701Z",
                "updatedAt": "2023-06-10T18:47:17.701Z",
                "__v": 0
            },
            {
                "_id": "64897393ccec149032214f47",
                "fullname": "Ann Oluchi",
                "username": "Oluchi",
                "email": "Oluchi@gmail.com",
                "createdAt": "2023-06-14T08:00:20.268Z",
                "updatedAt": "2023-06-14T08:00:20.268Z",
                "__v": 0
            }
        ],
        "pagination": {
            "totalCount": 5,
            "totalPages": null
        }
    }



## Get Single User 
    Make a get request to this endpoint
    url: 'https://domainname/admin/user/:userId',
    Method: 'GET',
    Headers: 'Accept: application/json',
    Bearer Token: - Token


### Response
    {
        "_id": "6484603b9a8d71285d12463f",
        "fullname": "Ikechukwu Vincent",
        "username": "Vincent",
        "email": "mr.ikunegbu@gmail.com
        "createdAt": "2023-06-10T11:36:27.361Z",
        "updatedAt": "2023-06-10T11:36:27.361Z",
        "__v": 0
    }





## Get Single User 
    Make a get request to this endpoint
    url: 'https://domainname/admin/site/:siteid',
    Method: 'GET',
    Headers: 'Accept: application/json',
    Bearer Token: - Token


### Response
    {
        "_id": "6484603b9a8d71285d12463f",
        "fullname": "Ikechukwu Vincent",
        "username": "Vincent",
        "email": "mr.ikunegbu@gmail.com
        "createdAt": "2023-06-10T11:36:27.361Z",
        "updatedAt": "2023-06-10T11:36:27.361Z",
        "__v": 0
    }






## Get All Sites
    Make a get request to this endpoint
    url: 'https://domainname/admin/sites',
    Method: 'GET',
    Headers: 'Accept: application/json',
    Bearer Token: - Token
### Response 

    {
        "sites": [
            {
                "_id": "64849b20326f53c186b9231a",
                "name": "My company",
                "url": "www.dexterpharm.com",
                "owner": "Lucia@gmail.com",
                "primary": "yes",
                "deleted": false,
                "createdAt": "2023-06-10T15:47:44.848Z",
                "updatedAt": "2023-06-10T15:47:44.848Z",
                "__v": 0
            },
            {
                "_id": "64849b9bbaf3f55f74226d2c",
                "name": "My blog",
                "url": "www.luciablog.com",
                "owner": "Lucia@gmail.com",
                "primary": "yes",
                "deleted": false,
                "createdAt": "2023-06-10T15:49:47.414Z",
                "updatedAt": "2023-06-10T15:49:47.414Z",
                "__v": 0
            },
            {
                "_id": "648c9e34d0c8aa7d6bc2c975",
                "name": "New Site",
                "url": "www.newsite.com",
                "owner": "Oluchi@gmail.com",
                "primary": "no",
                "deleted": false,
                "createdAt": "2023-06-16T17:39:00.304Z",
                "updatedAt": "2023-06-16T17:39:00.304Z",
                "__v": 0
            }
        ],
        "pagination": {
            "totalCount": 7,
            "totalPages": null
        }
    }
