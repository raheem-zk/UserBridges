import { useDispatch } from "react-redux";
import { logout } from "../../Redux/adminAuth";
import useAdminIsLogin from "../../customHook/admin/adminIsLogin";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function AdminLogout(){
    useAdminIsLogin();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(logout());
        navigate('/admin/login');
    },[])
    return null;
}

export default AdminLogout;