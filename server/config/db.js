const mongoose = require('mongoose')
const mongoDB=()=>{
    mongoose.connect("mongodb://localhost:27017/Softproinnovation").then(()=>{
        console.log("Database connected")
    }).catch((err)=>{
        console.log("database is not connected")
    })
}
module.exports=mongoDB;
