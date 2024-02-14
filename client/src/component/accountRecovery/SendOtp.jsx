import React, {useRef, useState} from 'react';
import {IsEmail} from "../../helper/FromHelper.js";
import toast, {Toaster} from "react-hot-toast";
import {otpSend} from "../../apiRequest/apiRequest.js";
import FullScreenLoder from "../masterLayout/FullScreenLoder.jsx";
import {useNavigate} from "react-router-dom";

const SendOtp = () => {
    const [loder, setLoder] = useState("d-none");
    const navigate = useNavigate();
    const [data, setData] = useState({
        email : ""
    });
    const {email} = data;
    const getEmailValue =(name,value) =>{
        setData((prev)=>({
            ...prev,
            [name] : value
        }))
    }
    const sendOtpUser = async  () => {
        if (IsEmail(email)){
            toast.error("User Email Required")
        }else {
            setLoder("")
            let res =  await otpSend(email);
            setLoder("d-none")
            if (res){
                toast.success("User Otp Send Successfully")
                navigate("/otp/verify")
            }else {
                toast.error("Something went worng")
            }

        }
    }
    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h4 className= "animated fadeInUpBig " >EMAIL ADDRESS</h4>
                                <br/>
                                <label>Your email address</label>
                                <input  value={email} onChange={(e)=>{getEmailValue("email",e.target.value)}}
                                        placeholder="User Email"
                                       className="form-control animated fadeInRight" type="email"/>
                                <br/>
                                <button onClick={sendOtpUser}
                                        className="btn w-100 animated fadeInLeft float-end btn-primary">Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FullScreenLoder visibility = {loder} />
            <Toaster position="top-center"/>
        </>
    );
};

export default SendOtp;