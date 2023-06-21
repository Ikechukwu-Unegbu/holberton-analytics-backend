## USER Profile relate API Documentation: FE-BE Integration

### User Profile 

    Make a get request to this endpoint
    url: 'https://domainname/user/profile/:userid',
    Method: 'GET',
    Headers: 'Accept: application/json',
    Bearer Token: - Token
**response**  

    {
        "_id": "64897393ccec149032214f47",
        "fullname": "Ann Oluchi",
        "username": "Oluchi",
        "email": "Oluchi@gmail.com",
        "createdAt": "2023-06-14T08:00:20.268Z",
        "updatedAt": "2023-06-14T08:00:20.268Z",
        "__v": 0
    }  





### Edit User Profile 

    Make a get request to this endpoint to edit user profile info
    url: 'https://domainname/user/edit/:userid',
    Method: 'POST',
    Headers: 'Accept: application/json',
    Bearer Token: - Token
    body:
    {
        "fullname":"Random Name",
        "username":"Rando",
        "email":"email@gmail.com"
    }  


**response**   

    {
        "_id": "64897393ccec149032214f47",
        "fullname": "Ann Oluchi",
        "username": "Oluchi",
        "email": "Oluchi@gmail.com",
        "createdAt": "2023-06-14T08:00:20.268Z",
        "updatedAt": "2023-06-14T08:00:20.268Z",
        "__v": 0
    }  





### Forgot Password

    Make a post request to this endpoint submitting user's email
    url: 'https://domainname/forgot-password',
    Method: 'POST',
    Headers: 'Accept: application/json',
    Bearer Token: - Token
    body:
    {
        "email":"email@gmail.com"
    }

**failure response**  
    {
        "error":"No user found with this email"
    }

**success response**  
    {
        "message":"Success message."
    }



