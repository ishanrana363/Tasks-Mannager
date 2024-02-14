import React, {Suspense} from 'react'
import MasterLayout from "../component/masterLayout/MasterLayout.jsx";
import LazyLodder from "../component/masterLayout/LazyLodder.jsx";
import { lazy } from 'react';
import Create from "../component/created/Create.jsx";
// const Create = lazy(()=>{import("./../component/created/Create")})

const CreatedPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLodder/>} >
                    <Create/>
                </Suspense>
            </MasterLayout>
        </div>
    )
}

export default CreatedPage
