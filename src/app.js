const express = require('express')
const dotenv = require('dotenv')
const Conn = require('./connect/db')
const route = require('./routes/auth')

//Connecting Mongo wih app
Conn()

//Linking .env file using this dependency
dotenv.config()

//App that has now all the power of express
const app = express()

//Can be used as a middleware
app.use(express.json())

//Defining port no which is stored in env file
const port = process.env.PORT


//Using the auth file in routes folder
app.use(route)


//Listening the port
app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})