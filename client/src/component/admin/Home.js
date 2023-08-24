import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import useAdminIsLogin from '../../customHook/admin/adminIsLogin';
import { SetUserCount } from '../../Redux/usersSlice';
import { logout } from "../../Redux/adminAuth";

import axios from 'axios';
const AdminHomePage = () => {
    useAdminIsLogin();
    const dispatch = useDispatch()
  const {blockedUserCount, userCount} = useSelector((state)=> state.users);
    useEffect(()=>{
      FetchDashboardData();
    },[]);

    const FetchDashboardData = async ()=>{
      try {
        await axios.get(`http://localhost:4000/admin`)
        .then((res)=>{
          dispatch(SetUserCount({blockedUserCount: res.data.blockedUserCount,userCount: res.data.userCount }))
        })
        .catch((err)=>{
          dispatch(logout());
          console.log(err);
        })
      } catch (error) {
        console.log(error);
      }
    }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-8 px-4">
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-gray-600">{userCount}</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Blocked Users</h2>
            <p className="text-gray-600">{blockedUserCount}</p>
          </div>
          {/* Add more data cards here */}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
