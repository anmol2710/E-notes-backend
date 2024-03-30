const mongoose = require("mongoose");

const userScheme = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    rollNo:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    }
})

const USER = mongoose.model("USER" , userScheme);
module.exports = USER;