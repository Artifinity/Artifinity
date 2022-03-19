### Users documentation
#### Register
- Post Request: ```/api/users/register```
- Body
```json
{
    "address": "6fd9d76a-55ef-476b-aa7f-fa34ce898ee6"
}
```
where ```address``` is the address of the user's wallet
- Response
* 200 Success
```json
{
    "address": "6fd9d76a-55ef-476b-aa7f-fa34ce898ee6",
    "nonce": "S3U3/4YUEhOSMOgtlC+/ow==",
    "id": "6235906d5e46ea658e889927"
}
```
* 400 Bad request
```json
{
    "message": "User with the same wallet address already exists.",
    "status": "failure",
    "data": {}
}
```

### Update profile personal data
- Put Request: ```/api/users/profile```
- Body
```json
{
    "firstName": "Ivan",
    "lastName": "Ivanov",
    "bio": "Born to be star",
    "portfolioUrl": "https://ivan-is-one.com",
    "id:": "6235906d5e46ea658e889927"
}
```
- Response
* 200 Success
```json
{
    "message": "The user personal data is updated.",
    "status": "success",
    "data": null
}
```
* 400 Bad request
Body: 
```json
{
    "firstName": "I",
    "lastName": "Ivanov",
    "bio": "Born to be star",
    "portfolioUrl": "https://ivan-is-one.com",
    "id:": "6235906d5e46ea658e889927"
}
```
Response
```json
{
    "message": "Some of the fields are invalid.",
    "status": "validationError",
    "data": [
        {
            "value": "I",
            "msg": "Invalid value",
            "param": "firstName",
            "location": "body"
        }
    ]
}
```

### Login