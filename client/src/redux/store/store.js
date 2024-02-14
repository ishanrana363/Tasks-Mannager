import {create} from "zustand";
import axios from "axios";
import {getToken, setUserData} from "../../helper/SessionHelper.js";
const baseUrl = "http://localhost:5500/api/v1";
let config = {
    headers: {
        "token" : getToken()
    }
}

const taskByStatusData = create((set)=>({


    statusData: [],
    statusDataRequest :  (remark)=>{
        try{
            let url = `${baseUrl}/list-task-by-status/${remark}`
            return axios.get(url,config).then((res)=>{
                if (res.data["status"]==="success"){
                    set({statusData:res.data.data })
                }
            }).catch((err)=>{
                console.log(err)
            })
        }catch (e) {
            console.log(e)
        }
    },
    statusCount : [],
    setStatusCount : () =>{
        let url = `${baseUrl}/task-count-by-status`
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({statusCount:res.data["data"]})
            }
        }).catch((err)=>{
            return false
        })
    },

    profileData: [],
    setProfileData :  ()=>{
        let url = `${baseUrl}/profile`
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({profileData:res.data["data"]})
            }else {
                return false
            }
        }).catch((err)=>{
            return false
        })
    },



}))





export default taskByStatusData;





