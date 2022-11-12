const mongoose = require("mongoose");
const customerScheme = new mongoose.Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
    },
    confirmpassword: {
        type:String,
        required:true,
    },
    firstname: {
        type:String,
        required:true,
    },
    lastname: {
        type:String,
        required:true,
    },
    age: {
        type:Number,
        required:true,
    }
})

//Collection

const Registration = new mongoose.model("Registration", customerScheme);
module.exports = Registration;