import MasterLayout from "../component/masterLayout/MasterLayout.jsx";
import {Suspense,lazy} from "react";
import LazyLodder from "../component/masterLayout/LazyLodder.jsx";
import Dashboard from "../component/dashboard/Dashboard.jsx";
// const Dashboard = lazy(()=> import("../component/dashboard/Dashboard.jsx") )

const DashboardPage = () => {

    return (
        <div>
            <MasterLayout>
                <Suspense fallback={<LazyLodder/>} >
                    <Dashboard/>
                </Suspense>
            </MasterLayout>
        </div>
    )
}

export default DashboardPage
