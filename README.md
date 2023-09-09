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
  "message": "User created",
  "data": {
      "name": "test",
      "email": "test@test.com"
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
 "email":"test@test.com",
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

