# Analytics API

## Reading Analytics of One Site Belonging to a User
    Make a get request to this endpoint
    url: 'https://domainname/analytics/:siteid/:duration',
    Method: 'GET',
    Headers: 'Accept: application/json',
    Bearer Token: - Token

### Empty response 
    []


### Response 
    [
        {
            "geoLocation": {
                "type": "Point",
                "coordinates": [
                    6.974604,
                    4.8472226
                ]
            },
            "_id": "64883f545ac2cf48eed9fff3",
            "owner": "kdajdfdjkfa9933",
            "site": "djkafjklafjalkal",
            "request": [
                {
                    "request_id": "1686650708267d6sX8WpweNnB",
                    "request_returns": "1",
                    "request_durations": [
                        0
                    ],
                    "expiration": "2023-06-14T10:05:08.312Z",
                    "_id": "64883f545ac2cf48eed9fff4"
                }
            ],
            "referral": "",
            "user_os": {
                "architecture": 64,
                "family": "Windows",
                "version": "10"
            },
            "user_browser": "Chrome",
            "pages": [
                {
                    "page_url": "http://127.0.0.1:5500/index.html",
                    "page_title": "Document Title",
                    "page_number": 1,
                    "performance": [
                        {
                            "page_loadtime": 382,
                            "fcp": "N/A",
                            "tti": "N/A",
                            "fmp": "N/A",
                            "loadeventime": -1686650707883,
                            "tps": 1928,
                            "_id": "64883f545ac2cf48eed9fff6"
                        }
                    ],
                    "_id": "64883f545ac2cf48eed9fff5"
                }
            ],
            "createdAt": "2023-06-13T10:05:08.349Z",
            "updatedAt": "2023-06-13T10:05:08.349Z",
            "__v": 0
        },
        {
            "geoLocation": {
                "type": "Point",
                "coordinates": [
                    8,
                    10
                ]
            },
            "_id": "64883fa15ac2cf48eed9fff8",
            "owner": "kdajdfdjkfa9933",
            "site": "djkafjklafjalkal",
            "request": [
                {
                    "request_id": "1686650785422dXXZ2NPWK7Oz",
                    "request_returns": "1",
                    "request_durations": [
                        0
                    ],
                    "expiration": "2023-06-14T10:06:25.484Z",
                    "_id": "64883fa15ac2cf48eed9fff9"
                }
            ],
            "referral": "",
            "user_os": {
                "architecture": 64,
                "family": "Windows",
                "version": "10"
            },
            "user_browser": "Chrome",
            "pages": [
                {
                    "page_url": "http://127.0.0.1:5500/index.html",
                    "page_title": "Document Title",
                    "page_number": 1,
                    "performance": [
                        {
                            "page_loadtime": 2878,
                            "fcp": 1985.7999999821186,
                            "tti": "N/A",
                            "fmp": 1985.7999999821186,
                            "loadeventime": -1686650782528,
                            "tps": 1994,
                            "_id": "64883fa15ac2cf48eed9fffb"
                        }
                    ],
                    "_id": "64883fa15ac2cf48eed9fffa"
                }
            ],
            "createdAt": "2023-06-13T10:06:25.494Z",
            "updatedAt": "2023-06-13T10:06:25.494Z",
            "__v": 0
        },
        {
            "geoLocation": {
                "type": "Point",
                "coordinates": [
                    6.974604,
                    4.8472226
                ]
            },
            "_id": "6488ae1a5ac2cf48eed9fffd",
            "owner": "kdajdfdjkfa9933",
            "site": "djkafjklafjalkal",
            "request": [
                {
                    "request_id": "1686679064903g4qnC2ndzgv1",
                    "request_returns": "1",
                    "request_durations": [
                        0
                    ],
                    "expiration": "2023-06-14T17:57:45.945Z",
                    "_id": "6488ae1a5ac2cf48eed9fffe"
                }
            ],
            "referral": "",
            "user_os": {
                "architecture": 64,
                "family": "Windows",
                "version": "10"
            },
            "user_browser": "Chrome",
            "pages": [
                {
                    "page_url": "http://127.0.0.1:5500/index.html",
                    "page_title": "Document Title",
                    "page_number": 1,
                    "performance": [
                        {
                            "page_loadtime": 415,
                            "fcp": "N/A",
                            "tti": "N/A",
                            "fmp": "N/A",
                            "loadeventime": -1686679064481,
                            "tps": 1998,
                            "_id": "6488ae1a5ac2cf48eeda0000"
                        }
                    ],
                    "_id": "6488ae1a5ac2cf48eed9ffff"
                }
            ],
            "createdAt": "2023-06-13T17:57:46.497Z",
            "updatedAt": "2023-06-13T17:57:46.497Z",
            "__v": 0
        }
    ]
