import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAdminIsLogin = () => {
  const navigator = useNavigate();
  const { success } = useSelector((state) => state.adminAuth);
  useEffect(()=>{
    if (!success) {
        navigator('/admin/login');
      }
  })
};

export default useAdminIsLogin;