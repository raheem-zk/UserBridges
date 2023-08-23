import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const useIsLogin = ()=>{
    const auth = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    useEffect(()=>{
        if (auth.token){
            navigate('/');
        }
    },[auth.token]);
}

export default useIsLogin;
