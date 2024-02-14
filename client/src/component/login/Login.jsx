import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {IsEmail, IsEmpty} from "../../helper/FromHelper.js";
import toast from "react-hot-toast";
import {login} from "../../apiRequest/apiRequest.js";
import FullScreenLoder from "../masterLayout/FullScreenLoder.jsx";


const Login = () => {
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        email : "",
        password : ""
    })

    const {email,password} = data;
    const onInputValue = (name,value)=>{
        setData((prev)=>({
            ...prev,
            [name] : value
        }))
    }


    const loginValue = async ()=>{
        if (IsEmail(email)){
            toast.error("Please Provide Your Email Address!")
        }else if(IsEmpty(password)){
            toast.error("Please Provide Your Password!")
        }else {

            setLoder("")
            let res = await login(data);
            setLoder("d-none")
            if(res){
                toast.success("User Login Successfully ");
                window.location.href = "/"
            }else {
                toast.error("Something went worng!")
            }
        }
    }

    return (
        <>
            <div className="container ">
                <div className="row justify-content-center "  >
                    <div className="col-md-7 col-lg-6 center-screen " >
                        <div className="card w-90  p-4"  >
                            <div className="card-body "  >
                                <h4 className="animated fadeInUpBig " >SIGN IN</h4>
                                <br/>
                                <input  value={email} onChange={(e)=>{onInputValue("email",e.target.value)}}
                                    placeholder="User Email" className="form-control animated fadeInLeftBig" type="email"/>
                                <br/>
                                <input  value={password} onChange={(e)=>{onInputValue("password",e.target.value)}}
                                    placeholder="User Password" className="form-control animated fadeInRight" type="password"/>
                                <br/>
                                <button  onClick={loginValue}  className="btn w-100 animated fadeInDownBig float-end btn-primary">Next</button>
                                <hr/>
                                <div className="float-end mt-3">

                                    <span>
                                        <Link className="text-center ms-3 h6 animated fadeInUp" to="/Registration">Sign Up </Link>
                                        <span className="ms-1">|</span>
                                        <Link className="text-center ms-3 h6 animated fadeInUp" to="/send/otp">Forget Password</Link>
                                    </span>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FullScreenLoder visibility = {loder}  />
        </>
    );
};
export default Login;
