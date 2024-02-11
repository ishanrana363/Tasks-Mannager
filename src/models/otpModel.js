const mongoose = require("mongoose");

const {model,Schema} = mongoose;

const otpSchema = new Schema({
    email : {
        type : String,
        required : true,
        lowercase : true
    },
    otp:{
        type : Number
    },
    status : {
        type : String,
        default : 1
    }
},{timestamps:true,versionKey:false});


const otpModel = model("otps",otpSchema);


module.exports = otpModel;