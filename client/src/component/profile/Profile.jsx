import React, {useEffect,useRef, useState} from 'react'
import taskByStatusData from "../../redux/store/store.js";
import FullScreenLoder from "../masterLayout/FullScreenLoder.jsx";
import {getBase64, IsEmail, IsEmpty, IsMobile} from "../../helper/FromHelper.js";
import toast, {Toaster} from "react-hot-toast";
import {profileUpdate} from "../../apiRequest/apiRequest.js";

const Profile = () => {
    let emailRef,firstNameRef,lastNameRef,mobileRef,passwordRef,userImgRef,userImgView=useRef();
    const [loder, setLoder] = useState("d-none");
    const {profileData,setProfileData} = taskByStatusData();
    useEffect(() => {
        (async ()=>{
            setLoder("");
            await setProfileData();
            setLoder("d-none");
        }) ()
    }, []);


    const imgPreview = () => {
        let imgFile = userImgRef.files[0]
        getBase64(imgFile).then((base64img)=>{
            userImgView.src = base64img
        })
    };
    const updateMyProfile = async () =>{
        let email = emailRef.value;
        let firstName = firstNameRef.value;
        let lastName = lastNameRef.value;
        let mobile = mobileRef.value;
        let password = passwordRef.value;
        let photo = userImgView.src;
        if (IsEmail(email)){
            toast.error("Your email address required")
        }else if(IsEmpty(firstName)){
            toast.error("Your firstName required ")
        }else if(IsEmpty(lastName)){
            toast.error("Your lastName required ")
        }
        else if (IsEmpty(password)){
            toast.error("Password required")
        }else {
            setLoder("");
            let res = await profileUpdate(email,firstName,lastName,mobile,password,photo);
            setLoder("d-none");
            if (res){
                toast.success("Profile update successfull ")
            }else {
                toast.error("Something went to worng")
            }
        }
    }
    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <img ref={(input) => userImgView = input} className="icon-nav-img-lg"
                                         src={profileData['photo']} alt=""/>
                                    <hr/>
                                    <div className="row">
                                        <div className="col-4 p-2">
                                            <label>Profile Picture</label>
                                            <input onChange={imgPreview}
                                                ref={(input)=> userImgRef=input }
                                                placeholder=" User Img " className="form-control animated fadeInUp"
                                                type="file"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label>Email Address</label>
                                            <input ref={ (input)=> emailRef = input }
                                                key={Date.now()} defaultValue={profileData['email']} readOnly={true}
                                                   placeholder="User Email"
                                                   className="form-control animated fadeInUp" type="email"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label>First Name</label>
                                            <input ref={ (input)=> firstNameRef = input }
                                                key={Date.now()} defaultValue={profileData['firstName']}
                                                   placeholder="First Name"
                                                   className="form-control animated fadeInUp" type="text"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label>Last Name</label>
                                            <input  ref={ (input)=> lastNameRef = input }
                                                    key={Date.now()} defaultValue={profileData['lastName']}
                                                   placeholder="Last Name"
                                                   className="form-control animated fadeInUp" type="text"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label>Mobile</label>
                                            <input ref={ (input)=> mobileRef = input }
                                                    key={Date.now()} defaultValue={profileData['mobile']}
                                                   placeholder="Mobile"
                                                   className="form-control animated fadeInUp" type="mobile"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label>Password</label>
                                            <input ref={ (input)=> passwordRef = input }
                                                    key={Date.now()} defaultValue={profileData['password']}
                                                   placeholder="User Password"
                                                   readOnly={true}
                                                   className="form-control animated fadeInUp" type="password"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <button onClick={updateMyProfile}
                                                className="btn w-100 float-end btn-primary animated fadeInUp">Update
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FullScreenLoder visibility = {loder} />
            <Toaster position="top-center"/>
        </>
    )
}

export default Profile
