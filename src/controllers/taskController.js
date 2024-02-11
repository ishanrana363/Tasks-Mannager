const taskModel = require("../models/taskModel");

// Create Task

exports.createTask = async (req,res)=>{
    try {
        let authEmail = req.headers["email"];
        let reqBody = req.body;
        reqBody.email = authEmail;
        let data = await taskModel.create(reqBody);
        res.status(201).json({
            status:"success",
            data : data
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:"fail",
            msg:"Something went worng!"
        })
    }
};

// task delete

exports.deleteTask = async (req,res)=>{
    try {
        let authEmail = req.headers["email"];
        let id = req.params.id;
        let filter = {
            email : authEmail,
            _id : id
        };
        let data = await taskModel.findOneAndDelete(filter);
        if(data===null){
            res.status(404).json({
                status:"fail",
                msg : "Data not found"
            })
        }else{
            await taskModel.findOneAndDelete(filter);
            res.status(200).json({
                status:"success",
                msg:"Data delete successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:"fail",
            msg:"Something went worng!"
        })
    }
};

//updateTaskByStatus

exports.updateTaskByStatus = async (req,res)=>{
    try {
        let id = req.params.id;
        let authEmail = req.headers["email"];
        let reqBody = req.body;
        let updateData = {
            status : reqBody["status"]
        };
        let update = updateData;

        let filter = {
            email : authEmail,
            _id : id
        };
        let data = await taskModel.updateOne(filter,update);
            res.status(200).json({
                status:"success",
                msg:data
            })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            msg:"Something went worng!"
        })
    }
};

//listTaskByStatus

exports.listTaskByStatus = async (req,res)=>{
    try {
        let status = req.params.status;
        let authEmail = req.headers["email"];
        let data = await taskModel.aggregate([
            { $match : { status : status , email : authEmail } },{
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    status: 1,
                    createdData: {
                        $dateToString: {
                            format: "%d-%m-%Y",
                            date: "$createdData"
                        }
                    }
                }
            }
        ])
        res.status(200).json({
            status:"success",
            data : data
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            msg:"Something went worng!"
        })
    }
};

// task count by status


exports.taskCountByStatus = async (req,res)=>{
    try {
        let email = req.headers["email"];
        let data = await taskModel.aggregate([
            { $match : { email :email } },
            { $group : { _id : "$status" , sum : { $count : { } } } }
        ])
        res.status(200).json({
            status:"success",
            data : data
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            msg:"Something went worng!"
        })
    }
}