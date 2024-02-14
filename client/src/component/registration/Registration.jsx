import React, {useState} from 'react';
import {IsEmail, IsEmpty, IsMobile} from "../../helper/FromHelper.js";
import toast, {Toaster} from "react-hot-toast";
import {registration} from "../../apiRequest/apiRequest.js";
import FullScreenLoder from "../masterLayout/FullScreenLoder.jsx";
import {useNavigate} from "react-router-dom";
const Registration = () => {
    const [loderData, setLoderData] = useState("d-none")
    const [data,setData] = useState({
        email : "",
        firstName:"",
        lastName:"",
        mobile:"",
        photo : "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8IS0tIFdyaXR0ZW4gYnkgVHJlZXIgKGdpdGxhYi5jb20vVHJlZXIpIC0tPg0KPHN2ZyANCgl2ZXJzaW9uPSIxLjEiIA0KCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgDQoJeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIA0KCXdpZHRoPSI2MDAiIA0KCWhlaWdodD0iNjAwIg0KCXN0cm9rZT0iYmxhY2siDQoJc3Ryb2tlLXdpZHRoPSIzMCINCglmaWxsPSJub25lIj4NCg0KICA8dGl0bGU+QWJzdHJhY3QgdXNlciBpY29uPC90aXRsZT4NCgkNCiAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMzAwIiByPSIyNjUiIC8+DQogIDxjaXJjbGUgY3g9IjMwMCIgY3k9IjIzMCIgcj0iMTE1IiAvPgkNCiAgPHBhdGggZD0iTTEwNi44MTg2MzQ0MzkwMyw0ODEuNCBhMjA1LDIwNSAxIDAsMSAzODYuMzYyNzMxMTIxOTQsMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIC8+DQo8L3N2Zz4=\n",
        password:"",
        confirmPassword:""
    })
    const onInputValue = (name,value)=>{
       setData((prev)=>({
            ...prev,
           [name] : value
       }))
    };
    const navigate = useNavigate()
    const {email,firstName,lastName,mobile,password,confirmPassword} = data;
    const registrationData = async () => {
        if(IsEmail(email)){
            toast.error("Valid Email Address Required");
        }else if (IsEmpty(firstName)){
            toast.error("First Name Required");
        }else if (IsEmpty(lastName)){
            toast.error("Last Name Required");
        }else if (!IsMobile(mobile)){
            toast.error("Please Provide Valid Mobile Number");
        }else if(password!==confirmPassword){
            toast.error("Your Password Not Match ")
        }else{
            setLoderData("")
            let res = await registration(data);
            setLoderData("d-none")
            if (res){
                toast.success("User account created successfully. ")
                navigate("/")
            }else {
                toast.error("Something Went to Worng")
            }
        }
    }
    return (
        <>
            <div className="container">
                <div className="row  justify-content-center">
                    <div className="col-md-10 col-lg-10 center-screen">
                        <div className="card animated fadeIn w-100 p-3">
                            <div className="card-body">
                                <h4>Sign Up</h4>
                                <hr/>
                                <div className="container-fluid m-0 p-0">
                                    <div className="row m-0 p-0">
                                        <div className="col-md-4 p-2">
                                            <label>Email Address</label>
                                            <input value={email} onChange={(e)=>{onInputValue("email",e.target.value)}}
                                                placeholder="User Email" className="form-control animated fadeInUp"
                                                   type="email"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>First Name</label>
                                            <input value={firstName} onChange={(e)=>{onInputValue("firstName",e.target.value)}}
                                                placeholder="First Name" className="form-control animated fadeInUp"
                                                   type="text"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Last Name</label>
                                            <input value={lastName} onChange={(e)=>{onInputValue("lastName",e.target.value)}}
                                                placeholder="Last Name" className="form-control animated fadeInUp"
                                                   type="text"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Mobile Number</label>
                                            <input value={mobile} onChange={(e)=>{onInputValue("mobile",e.target.value)}}
                                                placeholder="Mobile" className="form-control animated fadeInUp"
                                                   type="mobile"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Password</label>
                                            <input  value={password} onChange={(e)=>{onInputValue("password",e.target.value)}}
                                                placeholder="User Password" className="form-control animated fadeInUp"
                                                   type="password"/>
                                        </div>
                                        <div className="col-md-4 p-2">
                                            <label>Confirm Password</label>
                                            <input value={confirmPassword} onChange={(e)=>{onInputValue("confirmPassword",e.target.value)}}
                                                placeholder="Confirm Password" className="form-control animated fadeInUp"
                                                   type="password"/>
                                        </div>

                                    </div>
                                    <div className="row mt-2 p-0">
                                        <div className="col-md-4 p-2">
                                            <button onClick={registrationData}
                                                className="btn mt-3 w-100 float-end btn-primary animated fadeInUp">Complete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center"/>
            <FullScreenLoder visibility = {loderData} />
        </>
);
};
export default Registration;