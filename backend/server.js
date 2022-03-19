// common js module
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDb = require('./config/db')
const usersRoutes = require('./routes/users')
const { errorHandler } = require('./middleware/errorMiddleware')


const PORT = process.env.PORT || 5051

//Connect to DB
connectDb()

const app = express()

// json Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))



//Routes
app.use('/api/user', usersRoutes)


app.use(errorHandler);

app.listen(PORT, ()=> console.log(`Server Running on PORT ${PORT}`))