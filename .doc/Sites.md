## Sites API Documentation: FE-BE Integration

The user do not need to type in their email. FE should fill that in from user state. **Primary** which takes in yes or no is a key to determine if the given site is the user's main website. This is the site whose analytics will show by default.

    Make a post request to this endpoint
    url: 'https://domainname/post_site/{username}',
    Method: 'POST',
    Headers: 'Accept: application/json',
    Bearer Token: - Token
    Body:  
    
    {
        "name":"My blog",
        "url":"www.luciablog.com",
        "owner":"Lucia@gmail.com",
        "primary":"no"
    }  

    
#### Response 
    {
        "message": "Site created successfully",
        "site": {
            "name": "PN Okeke",
            "url": "www.luciablog.com",
            "owner": "Lucia@gmail.com",
            "primary": "no",
            "deleted": false,
            "_id": "64849cd2baf3f55f74226d30",
            "createdAt": "2023-06-10T15:54:58.757Z",
            "updatedAt": "2023-06-10T15:54:58.757Z",
            "__v": 0
        }
    }


### Fetch All Sites Belonging to a User
    [
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
        }
    ]