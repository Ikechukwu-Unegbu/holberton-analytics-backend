# Authentication Docs

### Log in User

    Make a post request to this endpoint
    url: 'https://domainname/login',
    Method: 'POST',
    Headers: 'Accept: application/json',
    Body:
    {
        "username":"Lucia",
        "password":"Lucia@gmail.com",
    }

#### Error Response 
    {
        "error": "Authentication failed"
    }    


#### Success Response 

    {
        "accessToken": "jbSBEPnMGkfOndIfMJfd0gcIUywgrz4rXLpCKqdVxvUjqWNvTCVVCjHkMwTSW3yS",
        "user": {
            "_id": "64897393ccec149032214f47",
            "fullname": "Ann Oluchi",
            "username": "Oluchi",
            "email": "Oluchi@gmail.com",
            "createdAt": "2023-06-14T08:00:20.268Z",
            "updatedAt": "2023-06-14T08:00:20.268Z",
            "__v": 0
        }
    }


