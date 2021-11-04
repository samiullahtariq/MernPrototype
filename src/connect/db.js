const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

let Conn = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }catch(err){
        console.log(err)
        console.log("Connection Failed")
    }
}

module.exports = Conn