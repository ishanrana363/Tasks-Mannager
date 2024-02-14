import React, {useEffect, useState} from 'react'
import taskByStatusData from "../../redux/store/store.js";
import FullScreenLoder from "../masterLayout/FullScreenLoder.jsx";

const Dashboard = () => {
    const {statusCount,setStatusCount} = taskByStatusData();
    const [loder, setLoder] = useState("d-none")
    useEffect(() => {
        (async ()=>{
            setLoder("")
            await setStatusCount();
            setLoder("d-none")
        }) ()
    }, []);
    return (
        <>
            <div className="container">
                    <div className="row  ">
                        {
                            statusCount.map((item,i)=> {
                                return (
                                    <div key={i} className="col-12 col-lg-3 col-sm-6 col-md-3   p-2">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h5 className="animated fadeInUp">Total { item._id }</h5>
                                                <h6 className="text-secondary animated fadeInUp"> { item.sum } </h6>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
            <FullScreenLoder visibility={loder}/>
        </>
    )
}

export default Dashboard
