const mongoose = require("mongoose");
require("dotenv").config();
const connectWithDB = () =>{
    mongoose.connect(process.env.mongo_url)
    .then(()=>{
        console.log("Server is Connected Successfully")
    })
    .catch((e)=>{
        console.log(e.message);
        console.log("Error while connecting to Db")
    })
}

module.exports = connectWithDB;