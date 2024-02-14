import React, {Suspense} from 'react'
import LazyLodder from "../component/masterLayout/LazyLodder.jsx";
import { lazy } from 'react';
import Cancel from "../component/canceled/Cancel.jsx";
import MasterLayout from "../component/masterLayout/MasterLayout.jsx";
// const  Cancel = lazy(()=>{import("../component/canceled/Cancel.jsx")} )


const CancelPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLodder/>} >
                    <Cancel/>
                </Suspense>
            </MasterLayout>
        </div>
    )
}

export default CancelPage
