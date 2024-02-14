import React, {Suspense, lazy} from 'react'
import LazyLodder from "../component/masterLayout/LazyLodder.jsx";
import MasterLayout from '../component/masterLayout/MasterLayout.jsx';
import Progress from "../component/progress/Progress.jsx";
// const Progress = lazy(()=>{import("./../component/progress/Progress")});

const ProgressPage = () => {
    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLodder/>} >
                    <Progress/>
                </Suspense>

            </MasterLayout>
        </div>
    )
}

export default ProgressPage
