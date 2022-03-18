const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


// @Desc Register a new user
// @Route /user
// @Access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password} = req.body
  if(!name || !email || !password){
     res.status(400)
     throw new Error("Please Includes all fields");
  }
  // find if user already exist
  const userExist = await User.findOne({ email })
  if(userExist){
    res.status(400)
    throw new Error('User Already Exist on the System')
  }

  // hash the password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  // create a new user
  const newUser = await User.create({
    name,
    email,
    password: hashPassword
  })
  if(newUser){
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
    });
  }else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
}
)

// @Desc  login user
// @Route /user/login
// @Access Public

const loginUser = asyncHandler( async (req, res) => {
  const {email, password } = req.body
  const user = await User.findOne({email})
  console.log(user.password)
  // check user exist and password match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalide Credentials");
  }
})

// @Desc  get current user
// @Route /user/me
// @Access Protected

const profile = asyncHandler( async (req, res) => {
  const user = {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name
  }
  res.status(200).send(user)
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: '30d'
  });
}

module.exports = {
  registerUser,
  loginUser,
  profile
}