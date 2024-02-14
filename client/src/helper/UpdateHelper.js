import Swal from "sweetalert2";
import {updateStatusData} from "../apiRequest/apiRequest.js";

export function UpdateToDO(id,status){
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        inputOptions: {new: 'new', complete: 'complete', progress: 'progress', cancel: 'cancel'},
        inputValue:status,
    }).then((result)=>{
        return updateStatusData(id, result.value).then((res)=>{
            alert(id)
            return res;
        })
    })
}