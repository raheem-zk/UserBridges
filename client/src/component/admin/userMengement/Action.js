import axios from "axios";
import { useParams } from "react-router-dom";

function Action(){
    const {id} = useParams()
    axios.get(`http://localhost:4000/admin/action/${id}`)
    .then((res)=>{
        console.log(res);
    })
    .catch((error)=>{
        console.log(error,' user status changing');
    })
}

export default Action;