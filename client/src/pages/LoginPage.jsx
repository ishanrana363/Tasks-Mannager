import React, {Suspense, lazy} from 'react'
import LazyLodder from "../component/masterLayout/LazyLodder.jsx";
import Login from "../component/login/Login.jsx";
// const Login = lazy(()=>{ import('./../component/login/Login') })

const LoginPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLodder/>} >
                <Login/>
            </Suspense>
        </div>
    )
}

export default LoginPage
