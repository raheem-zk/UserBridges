import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/userAuth';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
      dispatch(logout()); 
      localStorage.removeItem('user');
      navigate('/login'); 
  }, []);

  return null; 
}

export default Logout;
