const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () =>{
    try {
        const db_port = "mongodb+srv://rana:usertest@cluster0.t4eowrb.mongodb.net/task-mannager-1"
        mongoose.connect(db_port);
        console.log("--Db is connect---");
    } catch (error) {
        console.log("--Db is not connec---");
        console.log(error)
    }
};

module.exports = connectDB;