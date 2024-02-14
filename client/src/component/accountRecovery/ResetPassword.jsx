import React, {useState} from 'react';
import FullScreenLoder from "../masterLayout/FullScreenLoder.jsx";
import toast, {Toaster} from "react-hot-toast";
import {IsEmail} from "../../helper/FromHelper.js";
import {setNewPassword} from "../../apiRequest/apiRequest.js";
import {useNavigate} from "react-router-dom";

const ResetPassword = () => {
    const navigate = useNavigate()
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        email : "",
        password : "",
        confirmPassword : ""

    });

    const {email,password,confirmPassword} = data;
    const onPasswordValueGet = (name,value) => {
        setData((prev)=>({
            ...prev,
            [name] : value
        }))
    };

    const isSetNewPassword = async () => {
        if (IsEmail(email)){
            toast.error("Email required")
        }else if (password!==confirmPassword){
            toast.error("Password and confirm password not match ")
        }else {
            setLoder("");
            let res = await setNewPassword(data);
            setLoder("d-none")
            if (res){
                toast.success("New password set successfully")
                navigate("/")
            }else {
                toast.error("Something went worng")
            }
        }

    }

    return (<>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h4 className="animated fadeInUp ">OTP VERIFICATION </h4>
                                <input value={email} onChange={(e)=>{onPasswordValueGet("email",e.target.value)}}
                                    required={true} placeholder="Email" type="email"
                                    className="form-control animated fadeInLeft mb-3 "
                                />
                                <input value={password} onChange={(e)=>{onPasswordValueGet("password",e.target.value)}}
                                    required={true} placeholder="Password" type="password"
                                    className="form-control animated  mb-3 "
                                />
                                <input value={confirmPassword} onChange={(e)=>{onPasswordValueGet("confirmPassword",e.target.value)}}
                                    required={true} placeholder="Confirm Password" type="password"
                                    className="form-control animated fadeInRight   "
                                />
                                <br/> <br/>
                                <button onClick={isSetNewPassword}
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

export default ResetPassword;