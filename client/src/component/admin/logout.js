import { useDispatch } from "react-redux";
import { logout } from "../../Redux/adminAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function AdminLogout(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
      localStorage.removeItem('admin');
        navigate('/admin/login');
        return ()=>{
            dispatch(logout());
        }
    })
}

export default AdminLogout;