import React, {Suspense, lazy} from 'react'
import LazyLodder from "../component/masterLayout/LazyLodder.jsx";
import Registration from "../component/registration/Registration.jsx";

// const Registration = lazy(()=>{ import("../component/registration/Registration.jsx")});

const RegistrationPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLodder/>} >
                <Registration/>
            </Suspense>
        </div>
    )
}

export default RegistrationPage
