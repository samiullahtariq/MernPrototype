const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config()
//Making a Schema

let userSchema = new mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    email:{
        type : String,
        required:true
    },
    work:{
        type : String,
        required:true
    },
    phone:{
        type : String,
        required:true
    },
    password:{
        type : String,
        required:true
    },
    cpassword:{
        type : String,
        required:true
    },
    tokens :[
        {
            token:{
                type : String,
                required:true
            }
        }
    ]
}) 


//Hashing the password so that hackers can not make a way in our application
//The second argument in the hash defines how much stronger you want the password to hash usually it is 10

userSchema.pre('save' , async function(){
    if(this.isModified('password')){
        this.password = bcrypt.hash(this.password ,12)
        this.cpassword = bcrypt.hash(this.cpassword ,12)
    }
})


//Generating a Jwt token so that will help us in cookies as well as securing the application and user 
// information

userSchema.methods.generateAuthToken = async function(){
    try{

        //generating and checking the token using id of user and giving path to .env file
        let token = jwt.sign({_id : this._id}, process.env.SERT_KEY)

        this.tokens = this.token.concat({token : token})

        //Saving the token
         await this.save()

         //returning the token
         return token
    }catch(err){
        res.json({err})
    }
  
}

//Making a model that will the properties of Schema
let User = mongoose.model("User" , userSchema)

module.exports = User