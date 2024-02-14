import React, {Suspense, lazy} from 'react'
import LazyLodder from "../component/masterLayout/LazyLodder.jsx";
import Complete from "../component/completed/Complete.jsx";
import MasterLayout from "../component/masterLayout/MasterLayout.jsx";
// const Complete = lazy(()=>{import("./../component/completed/Complete")})

const CompletedPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLodder/>} >
                    <Complete/>
                </Suspense>
            </MasterLayout>
        </div>
    )
}

export default CompletedPage
