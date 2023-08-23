import { useDispatch } from "react-redux";
import { logout } from "../../Redux/adminAuth";
import useAdminIsLogin from "../../customHook/admin/adminIsLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function AdminLogout(){
    const dispatch = useDispatch()
    dispatch(logout());
    const navigate = useNavigate()
    useEffect(()=>{
        navigate('/admin/login');
    })
}

export default AdminLogout;