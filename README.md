
### Support Ticket System Documentation
The Backend Service was build with NodeJS, Express and Mongodb noSql Database
which as the following endpoint.
## Create User

Endpoint - Post Request : 'api/user/login'

# Payload: 
{
  email: "demo1345@gmail.com"
  password: ""
}
# Reaponse:
 {
   "_id":"6234b653040487aa75a87b83","name":"demo account","email":"demo1@gmail.com","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzRiNjUzMDQwNDg3YWE3NWE4N2I56MyIsImlhdCI6MTY0ODQ0NjQ4NCwiZXhwIjoxNjUxMDM4NDg0fQ.AOlrcV7Ot_SQPREubbkZZzlSEs98gOIX5qxbr-S6X40"
   }

## Get User Tickets
Endpoint - Get : '/api/ticket'

# Response: 
[
  {
    "_id":"6236561f0181ee08e60a97d6","user":"6234b653040487aa75a87b83","product":"iPhone","description":"blank screen","createdAt":"2022-03-19T22:15:59.876Z","updatedAt":"2022-03-20T15:02:49.400Z","__v":0,"status":"closed"
  },
{
  "_id":"62371709b77e2b2183994478","user":"6234b653040487aa75a87b83","product":"MacBook Pro","description":"Demonstration with string mac book","status":"new","createdAt":"2022-03-20T11:59:05.378Z","updatedAt":"2022-03-20T11:59:05.378Z","__v":0
},
{
  "_id":"623718ff0fbd5b5e77313d78","user":"6234b653040487aa75a87b83","product":"MacBook Pro","description":"Versatile Device with long lasting life","status":"new","createdAt":"2022-03-20T12:07:27.960Z","updatedAt":"2022-03-20T12:07:27.960Z","__v":0
}
]

## Register a User
Endpoint - Post: 'api/user'

# Payload: 
{
  email: "testqa@gmail.com"
  name: "TestQA"
  password: "pass123"
}
# Response: 
{
  "_id":"62414d5029380f2159c70ff4","name":"TestQA","email":"testqa@gmail.com","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDE0ZDUwMjkzODBmMjE1OWM3MGZmNCIsImlhdCI6MTY0ODQ0NjgwMCwiZXhwIjoxNjUxMDM4ODAwfQ.n0cZh44uFDtHHqpJsSJjMHlLPsSA1LbJFlakDzk-6bE"
  }

## Create a Ticket
Endpoint - Post: '/api/ticket'
# Payload: 

  { 
    product: "MacBook Pro", description: "Super pop Screen"
  }
# Response: 
{
  "user":"62414d5029380f2159c70ff4","product":"MacBook Pro","description":"Super pop Screen","status":"new","_id":"62414e1129380f2159c70ffe",
  "createdAt":"2022-03-28T05:56:33.789Z",
  "updatedAt":"2022-03-28T05:56:33.789Z","__v":0
}

## View Single User Ticket
Endpoint - Get: '/api/ticket/:ticketId'

# Response:
{"_id":"62414e1129380f2159c70ffe","user":"62414d5029380f2159c70ff4","product":"MacBook Pro","description":"Super pop Screen","status":"new","createdAt":"2022-03-28T05:56:33.789Z","updatedAt":"2022-03-28T05:56:33.789Z","__v":0
}

## Add Ticket Note
Endpoint - Post: '/api/ticket/:ticketId/notes'
# Payload: 
{ text: "Normal Flow" }
# Response
{
  "user":"62414d5029380f2159c70ff4","ticket":"62414e1129380f2159c70ffe","text":"Normal Flow","isStaff":false,"_id":"62414ef229380f2159c7100d","createdAt":"2022-03-28T06:00:18.846Z","updatedAt":"2022-03-28T06:00:18.846Z","__v":0
}

## All Ticket Note
Endpoint - Get: '/api/ticket/:ticketId/notes'
# Response
[
  {"_id":"62414ef229380f2159c7100d","user":"62414d5029380f2159c70ff4","ticket":"62414e1129380f2159c70ffe","text":"Normal Flow","isStaff":false,"createdAt":"2022-03-28T06:00:18.846Z","updatedAt":"2022-03-28T06:00:18.846Z","__v":0}
]

## Close Ticket
Endpoint - Put: '/api/ticket/:ticketId'

# Payload
{status: "closed"}

# Response
{
  "_id":"62371709b77e2b2183994478","user":"6234b653040487aa75a87b83","product":"MacBook Pro","description":"Demonstration with string mac book","status":"closed","createdAt":"2022-03-20T11:59:05.378Z","updatedAt":"2022-03-28T06:16:21.933Z","__v":0
}


### `npm start`

