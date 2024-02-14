import React, {Suspense} from 'react'
import LazyLodder from "../component/masterLayout/LazyLodder.jsx";
import MasterLayout from '../component/masterLayout/MasterLayout.jsx';
import { lazy } from 'react';
import NewData from "../component/new/New.jsx";
// const NewData = lazy(()=>{ import("../component/new/New.jsx")})

const NewPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLodder/>} >
                    <NewData />
                </Suspense>
            </MasterLayout>
        </div>
    )
}

export default NewPage
