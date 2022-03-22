// common js module
const express = require('express')
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDb = require('./config/db')
const usersRoutes = require('./routes/users')
const { errorHandler } = require('./middleware/errorMiddleware')
const ticketRoutes = require('./routes/tickets')

const PORT = process.env.PORT || 5051

//Connect to DB
connectDb()

const app = express()

// json Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//Routes
app.use('/api/user', usersRoutes)
app.use('/api/ticket', ticketRoutes)

if(process.env.NODE_ENV === 'production'){
  //set build folder at static
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
}else{
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Support Servicr API" });
  });

}

app.use(errorHandler);

app.listen(PORT, ()=> console.log(`Server Running on PORT ${PORT}`))