import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const useIsLogout = ()=>{
    const auth = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if (!auth.token){
            navigate('/login');
        }
    }, [auth.token]);
}

export default useIsLogout;
