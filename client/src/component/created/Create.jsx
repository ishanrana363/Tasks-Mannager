import React, {useRef, useState} from 'react';
import {Container, Row} from "react-bootstrap";
import {IsEmpty} from "../../helper/FromHelper.js";
import toast, {Toaster} from "react-hot-toast";
import {createTask} from "../../apiRequest/apiRequest.js";
import FullScreenLoder from "../masterLayout/FullScreenLoder.jsx";
import {useNavigate} from "react-router-dom";

const Create = () => {
    const [loder, setLoder] = useState("d-none")
    const [data, setData] = useState({
        title : "",
        description : ""
    })
    const {title,description} = data;
    const navigate = useNavigate()



    const onGetValue = (name,value) => {
        setData((prev)=>({
            ...prev,
            [name] : value
        }))
    }

    const isCreateValue = async () => {
        if (IsEmpty(title)){
            toast.error("Title Required")
        }else if (IsEmpty(description)){
            toast.error("Description Required")
        }else {
            setLoder("")
            let res = await createTask(title,description)
            setLoder("d-none")
            if (res){
                navigate("/new")
                toast.success("Task Created Successfully");
            }
            else {
                toast.error(" Something went worng!");
            }
        }

    }

    return (
        <>
            <Container fluid={true} className="content-body">
                <Row className="d-flex justify-content-center">
                    <div className="col-12 col-lg-8  col-sm-12 col-md-8 p-2" >
                        <div className="card">
                            <div className="card-body ">
                                <h4 >Create New</h4>
                                <br/>
                                <input value={title} onChange={(e)=>{onGetValue("title",e.target.value)}}
                                       placeholder="Task Name" className="form-control w-100 animated fadeInUp" type="text"/>
                                <br/>
                                <textarea value={description} onChange={(e)=>{onGetValue("description",e.target.value)}}
                                    rows={5} placeholder="Task Description" className="form-control animated fadeInUp w-100 " type="text"/>
                                <br/>
                                <button onClick={isCreateValue}  className="btn float-end btn-primary">Create</button>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
            <Toaster position="top-center"/>
            <FullScreenLoder visibility = {loder}  />

        </>
    );
};
export default Create;