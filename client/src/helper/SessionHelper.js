class sessionHelper {
    setToken(token){
        localStorage.setItem("token",token)
    }
    getToken (){
        return localStorage.getItem("token")
    }
    setUserData (UserData){
        localStorage.setItem("UserDetails",JSON.stringify(UserData))
    }
    getUserData (){
        return JSON.parse(localStorage.getItem("UserDetails"))
    }
    removeSession (){
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/"
    }
}

export const {setToken,getToken,setUserData,getUserData,removeSession} = new sessionHelper();