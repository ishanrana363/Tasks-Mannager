import React, {useState} from 'react';
import {IsEmail, IsEmpty} from "../../helper/FromHelper.js";
import toast, {Toaster} from "react-hot-toast";
import {otpVerify} from "../../apiRequest/apiRequest.js";
import {useNavigate} from "react-router-dom";
import FullScreenLoder from "../masterLayout/FullScreenLoder.jsx";

const OtpVerify = () => {
    const navigate = useNavigate();
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        email : "",
        otp : ""
    })
    const {email,otp} = data;
    const onInputValueGet = (name,value) => {
        setData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
    const verifyOtpValue = async () => {
        if (IsEmail(email)){
            toast.error("Email address required");
        }else if (IsEmpty(otp)){
            toast.error("Otp code required");
        }else {
            setLoder("")
            let res = await otpVerify(email,otp);
            setLoder("d-none")
            if (res){
                toast.success("Otp verify successful")
                navigate("/new/password")
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
                                <h4 className="animated fadeInUp " >OTP VERIFICATION </h4>
                                <input value={email}
                                       onChange={(e)=>{onInputValueGet("email",e.target.value)}}
                                        required={true} placeholder="Email" type="email" className="form-control animated fadeInLeft mb-3 "
                                />
                                <input value={otp} onChange={(e)=>{onInputValueGet("otp",e.target.value)}}
                                    required={true} placeholder="Otp code" type="number" className="form-control animated fadeInRight  "
                                />
                                <br/> <br/>
                                <button onClick={verifyOtpValue}
                                        className="btn w-100 animated fadeInDown float-end btn-primary">Next
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

export default OtpVerify;