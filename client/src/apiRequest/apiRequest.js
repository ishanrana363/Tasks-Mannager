import axios from "axios";
import {getToken, setToken, setUserData} from "../helper/SessionHelper.js";
import {SuccessToast} from "../helper/FromHelper.js";

const baseUrl = "http://localhost:5500/api/v1";


export const registration = async (postBody)=>{
    try{
        let res = await axios.post(`${baseUrl}/registration`,postBody);
        console.log(res.data["status"])
        return res.data["status"]

    }   catch (e){
        return false
    }
}

export const login = async (postBody)=>{
    try{
        let res = await axios.post(`${baseUrl}/login`,postBody);
        setToken(res.data["token"]);
        setUserData(res.data["data"])
        return res.data["status"]

    }   catch (e){
        return false
    }
}

let config = {
    headers: {
       "token" : getToken()
    }
}
export const createTask = async (title, description) => {
    try {
        let url = `${baseUrl}/create-task`;
        let postBody = { "title": title, "description": description, "status": "new" };
        let res = await axios.post(url, postBody,config);
        if (res.status === 201) {
            return true;
        }else if (res.status===401){
            SuccessToast("Unauthorize User")
        }
        else {
            return false;
        }
    } catch (error) {
        console.error("Error creating task:", error);
        return false; // Return false in case of any error
    }
}

export const taskDelete = (id) =>{
    let url = `${baseUrl}/delete-task/${id}`
    return axios.delete(url,config).then((res)=>{
        if(res.data["status"]==="success"){
            return true
        }else {
            return false
        }
    }).catch((err)=>{
        console.log(err)
    })

}

export const updateStatusData = (id,status) =>{
    let url = `${baseUrl}/update-task-by-status/${id}/${status}`
    return axios.put(url,config).then((res)=>{
        if (res.data["status"]==="success"){
            return true
        }
    }).catch((err)=>{
        return false
    })
}



export const profileUpdate = (email,firstName,lastName,mobile,password,photo) =>{
    let url = `${baseUrl}/update`;
    let postBody = {email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password,photo:photo};
    let userDetails = {email:email,firstName:firstName,lastName:lastName,mobile:mobile,photo:photo}
    return axios.put(url,postBody,config).then((res)=>{
        if (res.data.status==="success"){
            setUserData(userDetails)
            return true
        }else {
            return false
        }
    }).catch((err)=>{
        return false
    })

}




export const otpSend = async (data) =>{
    let res = await axios.get(`${baseUrl}/send-email/${data}`);
    if (res.data["status"]==="success"){
        return true
    }else {
        return false
    }
}

export const otpVerify = async (email,otp) =>{
    let res = await axios.get(`${baseUrl}/email-verify/${email}/${otp}`);
    if (res.data["status"]==="success"){
        return true
    }else {
        return false
    }
}

export const setNewPassword = async (data) =>{
    let res = await axios.post(`${baseUrl}/password-reset`,data);
    if (res.data["status"]==="success"){
        return true
    }else {
        return false
    }
}





