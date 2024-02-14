import React, {Suspense, lazy} from 'react'
import LazyLodder from "../component/masterLayout/LazyLodder.jsx";
import MasterLayout from './../component/masterLayout/MasterLayout';
import Profile from "../component/profile/Profile.jsx";
// const Profile = lazy(()=>{import('./../component/profile/Profile')})
const ProfilePage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLodder/>} >
                    <Profile/>
                </Suspense>
            </MasterLayout>
        </div>
    )
}

export default ProfilePage
