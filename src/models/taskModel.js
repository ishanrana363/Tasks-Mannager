const mongoose = require("mongoose");
const {model,Schema} = mongoose;

const taskSchema = new Schema({
    title:{
        type:String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    status:{
        type:String,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    createdData : {
        type : Date,
        default : Date.now()
    }
},{versionKey:false});


const taskModel = model("tasks",taskSchema);


module.exports = taskModel;