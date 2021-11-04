const User = require('../models/userModel')
const express =require('express')
const bcrypt = require('bcryptjs')

//Routes
const route = express.Router()

//Creating a registration form

route.post('/register' ,async(req ,res)=>{
    try{
        //Destructuring of Model
        const {name ,email , work , phone ,password ,cpassword} = req.body

        //Checking if the fields are empty
        if(!name || !email || !work || !phone || !password || !cpassword){
            res.json({message:"Please fill the required Fields"})
        }


        //Checking email Validation
        //Using Models where data is defiend

        let userEmail = User.findOne({email : email})

        if(userEmail){
            res.json({messge:"Email Already Exists"})
        }else{
            res.json({message:"User is successfully registered"})
        }

        //Saving User Data in database

        let userData = new User({name ,email , work ,phone , password , cpassword})

        await userData.save()

    }catch(err){
        res.status(404).json({Error :"An Error Occured"})
    }
})


//Creating a Sign up Page
//Sign up page has two fields email and password

route.post('/signUp' ,async(req ,res)=>{
    try{

        //Destructuring 

        const {email , password} = req.body

        //Checking if the fields are empty

        if(!email || !password){
            res.json({message :"Required Fields are empty"})
        }


        //Checking user email

        let UserEmail = User.findOne({email : email})

        //Validation

        if(UserEmail){
            //Matching the hashed password

            let isMatch = bcrypt.convert(this.password , UserEmail.password)

            //Jwt token and cookie
            const token =await userEmail.generateAuthToken()

            res.cookie('jwtoken' ,token ,{
                expires:new Date(Date.now() + 25892000000),
                httpOnlt :true
            })

            //Validation
            if(isMatch){
                res.json({message:"Validation Successful"})
            }
            
        }else{
            res.json({Error :"Invalid password or Email"})
        }

    
    }catch(err){
            res.json(err)
    }
})

module.exports = route