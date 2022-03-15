// common js module
const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5051


const app = express()


app.listen(PORT, ()=> console.log(`Server Running on PORT ${PORT}`))