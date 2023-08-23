import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import useAdminIsLogin from '../../customHook/admin/adminIsLogin';

const AdminHomePage = () => {
  const data = useSelector((state)=> state.adminAuth);

  console.log(data);
    useAdminIsLogin();
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="py-8 px-4">
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Total Users</h2>
            <p className="text-gray-600">1234</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Total Products</h2>
            <p className="text-gray-600">567</p>
          </div>
          {/* Add more data cards here */}
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
