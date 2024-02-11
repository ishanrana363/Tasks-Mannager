const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email number!`
            },
            required: [true, 'User email address required']
    },
    firstName:{
        type:String,
        required : true
    },
    lastName : {
        type:String,
        required : true
    },
    mobile : {
        type : String
    },
    password:{
        type:String
    },
    photo : {
        type : String
    },
    createdData : {
        type : Date,
        default : Date.now()
    }
},{versionKey:false});

const userModel = model("users",userSchema);

module.exports = userModel;