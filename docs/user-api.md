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
- Post request: ```api/users/login```
- Body
```json
{
    "address": "0xF552c1D9415aA2485876AD2BdFc6B8A0C84075FC",
    "signature": "0x2dd0f28e02bb58c8d96409ca3d0fdb668bb46c78c39d3f8a137ce16204743f6c65d58ce1fe4c436129bdcb817c9c26082f255393829f13440da999d2b7878c021b"
}
```
- Response
* 200 Success
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzViZTMwMzRiMTA2NzBjNzI2YWFhNSIsImlhdCI6MTY0NzY5ODMzNywiZXhwIjoxNjQ3NzAxOTM3fQ.V8MtK49ilkAStd4ntE73mdD9DyMKvMu4W4rcDXvManI",
    "id": "6235be3034b10670c726aaa5"
}
```
* 400 Bad request
```json
{
    "message": "Invalid credentials.",
    "status": "failure",
    "data": {}
}
```