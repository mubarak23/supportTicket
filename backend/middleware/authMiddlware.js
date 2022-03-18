const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protected = asyncHandler (async(req, res, next) => {

  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try{

      //Get Token
      token = req.headers.authorization.split(' ')[1]

      //verify the token
      const decodeToken = jwt.verify(token, process.env.SECRET);

      req.user = await User.findById(decodeToken.id).select('-password')
      next()
    }catch(err){
      console.log(err)
      res.status(401)
      throw new Error('Not Authorized')
    }
  }
  if(!token){
     res.status(401);
     throw new Error("Not Authorized");
  }

})


module.exports = { protected }