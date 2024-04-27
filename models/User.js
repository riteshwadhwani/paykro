const  mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        unique:true,
        lowercase:true,
        minLength:3,
        maxLength:40,
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model("User",userSchema);