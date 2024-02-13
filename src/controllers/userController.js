const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const SendEmailUtility = require("../helper/emailHelper");
const taskModel = require("../models/taskModel");
const otpModel = require("../models/otpModel");


// Registration

exports.registration=async(req,res)=>{
    try {
        let reqBody = req.body;
        let email = reqBody["email"]
        let userMail = await userModel.findOne({email:email});
        if(userMail) throw new error()
        let data = await userModel.create(reqBody);
        res.status(201).json({
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

// login

exports.login = async(req,res)=>{
    try {
        let reqBody = req.body;
        let data = await userModel.findOne(reqBody);

        if(data){
            // create jwt token
            const payload = { 
                exp: Math.floor(Date.now() / 1000) + (60 * 60*24),
                email : data["email"],
                id : data._id
            }
            let key = "lkfjdsfjkdsofdsjpfo"
            let token = jwt.sign(payload,key);
            res.status(201).json({
                status:"success",
                token : token,
                photo : data.photo,
                data : data
            })
        }else{
            res.status(404).json({
                status:"fail",
                msg:"data not found",
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


// profile update

exports.profileUpdate = async(req,res)=>{
    try {
        let reqBody = req.body;
        let updateData = {
            firstName : reqBody["firstName"],
            lastName : reqBody["lastName"],
            mobile : reqBody["mobile"],
            photo : reqBody["photo"]
        };
        let authEmail = req.headers["email"];
        let filter = { email : authEmail };
        if(!filter){
            res.status(404).json({
                status:"fail",
                msg:"User not found."
            });

        }
        let data = await userModel.findOneAndUpdate(filter,updateData,{new:true});
        res.status(200).json({
            status:"success",
            data : data
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status:"fail",
            msg:"Something went worng!"
        })
    }
};

exports.profileView = async(req,res)=>{
    try {        
        let authEmail = req.headers["email"];
        let filter = { email : authEmail };
        let data = await userModel.findOne(filter)
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


exports.sendEmailUser = async (req, res) => {
    try {
        let email = req.params.email;
        let otpCode = Math.floor(100000 + Math.random() * 999999);
        let emailText = ` Your verification code is ${otpCode} `;
        let emailSub = ` Verification code `;

        await SendEmailUtility(email, emailText, emailSub);

        await otpModel.updateOne({ email: email }, { $set: { otp: otpCode } }, { upsert: true });

        res.status(200).send({
            status: "success",
            message: "Email sent successfully"
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            status: "fail",
            message: "Something went wrong!"
        });
    }
};

exports.emailOtpVerify = async(req, res) => {
    try {
        let email = req.params.email;
        let statusCode = 1;
        let statusUpdate = 0;
        let otp = req.params.otp;
        let filter = {
            otp: otp,
            email: email,
            status: statusCode
        };

        let data = await otpModel.findOne(filter);
        if (data) {
            const updatedData = await otpModel.updateOne(filter, { $set: { status: statusUpdate } });
            return res.status(200).json({
                status: "success",
                msg: "Otp verification successfully",
                data: updatedData
            });
        }

        res.status(404).json({
            status: "fail",
            msg: "Invalid OTP or email"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "fail",
            msg: "Something went wrong!"
        });
    }
};


exports.userPasswordReset = async (req, res) => {
    try {
        const { email, password, otp } = req.body;

        // Validate inputs
        if (!email || !password || !otp) {
            return res.status(400).json({ status: "fail", msg: "Email, password, and OTP are required" });
        }

        // Check if OTP is valid and matches the email with the correct status
        const otpData = await otpModel.findOne({ otp, email, status: 0 });
        if (!otpData) {
            return res.status(404).json({ status: "fail", msg: "Invalid OTP or email" });
        }

        // Update user password
        const userData = await userModel.updateOne({ email }, { $set: { password } });
        await otpModel.updateOne({email},{ $set : {otp:0}  })

        res.status(200).json({ status: "success", msg: "Password reset successfully", data: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "fail", msg: "Something went wrong!" });
    }
};
