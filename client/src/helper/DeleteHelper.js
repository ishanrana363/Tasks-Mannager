import Swal from "sweetalert2";
import {taskDelete} from "../apiRequest/apiRequest.js";

export function deleteToDO(id){
    return  Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if(result.isConfirmed){
            return taskDelete(id).then((deleteResult)=>{
                return deleteResult
            })
        }
    })

}