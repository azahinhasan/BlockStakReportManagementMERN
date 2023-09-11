# BlockStak - Report Management with MERN

---

## Install

- Download Node.js into the system and install
- Run the following command in the root directory:
  `npm install`

## Run the app

- Run the following command in the root directory:
  `npm run dev`
- Access the app from port: 5003 (http://localhost:5003/). Users can change ports from env file.
- Optional: User can run this command `npm run docs` to create jsDoc documentation. After running this command there will be a new folder call `docs` created in root. From there user have to open `index.html` file into any browser.


---

# REST API

The REST API to the example app is described below.

## User

API related to user.

### Create or register a user.

After registration user can log in with this information.

#### Request

`POST /api/user`

With the following data in the body

```
 {
 "name":"test_user",
 "email":"test_user@test.com",
 "password":"123456",
 "is_admin":true,
 "favorite_colors":["black"]
}
```

#### Response

If created successfully:

```
 {
  "success": true,
  "message": "User created",
  "data": {
      "name": "test_user",
      "email": "test_user@test.com"
  }
}
```

## Auth

API related to signIn and signOut.

### LogIn/SignIn

After login user can access other APIs. Because successfully login there will be a token set into cookies.
<br/>
Need this token to access other APIs.

#### Request

`POST /api/auth/signin`

With the following data in the body

```
{
 "email":"test_user@test.com",
 "password":"123456"
}
```

#### Response

If verification is successful:

```
{
    "success": true,
    "message": "Authentication success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGZjOTdhMjI5YThkZjcwMGM2MWEwMmMiLCJpYXQiOjE2OTQyNzYxOTEsImV4cCI6MTY5NDI3OTc5MX0.XF9aJaQH2BdkZbzIPHaxFECJGbu37OQyyouBU9mz4lk"
}
```

Also, this token will be set into the cookie.


### LogOut/SignOut

The token will be removed from the cookie and the session will be destroyed.

#### Request

`GET /api/auth/signout`


#### Response


```
{
    "success": true,
    "message": "signed out"
}
```

## Report

API related to Report.
 <br/>

`Note: For successfully report create,delete,update and get report by Id ,make sure user is logged in and also admin. Get all reports not required user type admin.`

### Create new Report.

User can create a new Report by this api.

#### Request

`POST /api/report`

With the following data in the body

```
 {
 "name":"test",
 "email":"test@test.com",
 "password":"123456",
 "is_admin":true,
 "favorite_colors":["black"]
}
```

#### Response

If created successfully:

```
{
    "success": true,
    "message": "Created Successfully",
    "data": {
        "favorite_colors": [
            "black"
        ],
        "_id": "64fca04a73271935707b618e",
        "name": "test",
        "email": "test@test.com",
        "__v": 0
    }
}
```
If there is no cookie:

```
{
    "success": false,
    "message": "No token found."
}
```
If there token is invalid or expired:

```
{
    "success": false,
    "message": "Unauthorized"
}
```
If user is not `Admin`:

```
{
    "success": false,
    "message": "Unauthorized to access"
}
```

### Get all Reports.

User can get list of reports.

#### Request

`GET /api/report`

#### Response

If successfully data found:

```
{
    "success": true,
    "message": "Data Found",
    "data": [
        {
            "favorite_colors": [
                "black"
            ],
            "_id": "64fca04a73271935707b618e",
            "name": "test",
            "email": "test@test.com",
            "__v": 0
        }
    ]
}
```
If there is no cookie:

```
Same as Create new Report.
```
If there token is invalid or expired:

```
Same as Create new Report.
```

### Get Report by ID.

User can find a report by its ID.

#### Request

`GET /api/report/:reportId`

#### Response

If matched found:

```
{
    "success": true,
    "message": "Data Found Successfully",
    "data": {
        "favorite_colors": [
            "black"
        ],
        "_id": "64fca04a73271935707b618e",
        "name": "test",
        "email": "test@test.com",
        "__v": 0
    }
}
```
If not matched found:

```
{
    "success": false,
    "message": "No match found"
}
```

If there is no cookie:

```
Same as Create new Report.
```
If there token is invalid or expired:

```
Same as Create new Report.
```
If user is not `Admin`:

```
Same as Create new Report.
```

### Update Report.

User can update report by this api.

#### Request

`PUT /api/report/:reportId`
With the following data in the body

```
{
 "name":"test_report",
 "email":"test_report@test.com",
 "password":"123456",
 "is_admin":true,
 "favorite_colors":["black"]
}
```

#### Response

If matched found and updated:

```
{
    "success": true,
    "message": "Report updated",
    "data": {
        "favorite_colors": [
            "black"
        ],
        "_id": "64fca04a73271935707b618e",
        "name": "test",
        "email": "test@test.com",
        "__v": 0
    }
}
```
If not matched found:

```
{
    "success": false,
    "message": "No match found"
}
```

If there is no cookie:

```
Same as Create new Report.
```
If there token is invalid or expired:

```
Same as Create new Report.
```
If user is not `Admin`:

```
Same as Create new Report.
```

### Delete Report.

User can delete specific report.

#### Request

`DELETE /api/report/:reportId`

#### Response

If matched found and deleted:

```
{
    "success": true,
    "message": "Report deleted"
}
```
If not matched found:

```
{
    "success": false,
    "message": "No match found"
}
```

If there is no cookie:

```
Same as Create new Report.
```
If there token is invalid or expired:

```
Same as Create new Report.
```
If user is not `Admin`:

```
Same as Create new Report.
```


---

## Additional Information
- I encountered minor session-related issues, which I resolved by using the `express-session` package.
- After a successful login, a token is generated with a one-hour expiration time and stored in cookies. The token is also saved in the session to track its activity. User can find this code in the signIn function located in `controller/auth.controller.js`.
- The checkTokenValidity middleware, found in `middleware/auth_check.middleware.js`, verifies the session's activity status. If the token has expired, the system checks if a session is present. If a session exists, it means the session is active, and the middleware creates a new token and stores it in cookies.
- Passwords are hashed using the crypto library. All related functions can be found in the `models/user.model.js` file.