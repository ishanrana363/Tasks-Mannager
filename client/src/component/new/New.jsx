import React, {Fragment, useEffect, useState} from 'react'
import {AiOutlineCalendar, AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {Container} from "react-bootstrap";
import taskByStatusData from "../../redux/store/store.js";
import {deleteToDO} from "../../helper/DeleteHelper.js";
import toast from "react-hot-toast";
import FullScreenLoder from "../masterLayout/FullScreenLoder.jsx";

const NewData = () => {
    const [loder, setLoder] = useState("d-none")

    const {statusData,statusDataRequest} = taskByStatusData();
    useEffect(() => {
        (async ()=>{
            setLoder("")
            await statusDataRequest("new");
            setLoder("d-none")
        })()
    }, []);

    const deleteData = (id) => {
        deleteToDO(id).then(async (res)=>{
            if (res===true){
                setLoder("")
                await statusDataRequest("new");
                setLoder("d-none")
            }
        })
    }

    return (
            <>
                <Container fluid={true} className="content-body">
                    <div className="row p-0 m-0">
                        <div className="col-12 col-md-6 col-lg-8 px-3">
                            <h5>Task New</h5>
                        </div>
                        <div className="col-12 float-end col-md-6 col-lg-4 px-2">
                            <div className="row">
                                <div className="col-8">
                                    <input className="form-control w-100"/>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-primary w-100">Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row p-0 m-0">

                        {
                            statusData.map((item,i)=>{
                                return (
                                    <div key={i} className="col-12 col-lg-4 col-sm-6 col-md-4  p-2">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <h6 className="animated fadeInUp"> {item.title} </h6>
                                                <p className="animated fadeInUp">{item.description}</p>
                                                <p className="m-0 animated fadeInUp p-0">
                                                    <AiOutlineCalendar/> date
                                                    <a  className="icon-nav text-primary mx-1"><AiOutlineEdit/></a>
                                                    <a onClick={deleteData.bind(this, item._id )} className="icon-nav text-danger mx-1"><AiOutlineDelete/></a>
                                                    <a className="badge float-end bg-info"> {item.status} </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </Container>
                <FullScreenLoder visibility = {loder} />
            </>
    )
}

export default NewData;
