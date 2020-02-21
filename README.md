# API Server with JWT Authentication

[Read how this repository was built line by
line.](https://travishorn.com/api-server-with-jwt-authentication-6bb4985c5253)

## Installation

Clone the repository

```
git clone https://github.com/travishorn/koa-sqlite-jwt-server.git
```

Change into the directory

```
cd koa-sqlite-jwt-server
```

Install dependencies

```
npm install
```

## Usage

Start the server

```
node index
```

### Get a JWT

Submit a POST request to `/auth` with the correct credentials.

```
curl --request POST \
  --url http://localhost:3000/auth \
  --header 'content-type: application/x-www-form-urlencoded' \
  --data username=travishorn \
  --data password=password
```

Note there is only one user, `travishorn`, in the databsae.

The server responds with a JWT in the body

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTU4MjI5NzkzMH0.9ATtjxSDOtn91Qqy3SFeNyg9h6eHqJnxlcnyalthK-w
```

### Use the generated JWT

Submit a GET request to `/my-pets` with the JWT as a bearer token.

```
curl --request GET \
  --url http://localhost:3000/my-pets \
  --header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTU4MjI5NzkzMH0.9ATtjxSDOtn91Qqy3SFeNyg9h6eHqJnxlcnyalthK-w'
```

The server responds with JSON data.

```
[
  {
    "name": "Bunny",
    "species": "dog"
  },
  {
    "name": "Ru",
    "species": "cat"
  }
]
```

## Setting up new users

This functionality doesn't exist in this project. One method you may consider is
to build a "register" route that you could POST to with a username and password.
From there, use `utilities/bcrypt.js` to hash the password and use `db/index.js`
to insert a row into the database.

## License

The MIT License

Copyright 2020 Travis Horn

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
