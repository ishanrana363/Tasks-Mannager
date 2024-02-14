import React from 'react';
import loader from "../Assets/img/loader.svg"
const Loder = (props) => {
    return (
        <div className={props.visibility}>
            <div className="ProcessingDiv">
                <div className="center-screen">
                    <img className="loader-size" src={loader}/>
                </div>
            </div>
        </div>
    );
};

export default Loder;