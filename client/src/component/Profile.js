import React, { useState } from 'react';
import useIsLogout from '../customHook/useIsLogout';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  useIsLogout();

  const { user } = useSelector((state) => state?.auth);
  console.log(user);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white shadow p-6 rounded-lg">
          <div className="bg-white shadow p-6 rounded-lg">
            <div className="flex items-center">
              {/* {image ? <img className="w-20 h-20 rounded-full" src={URL.createObjectURL(image)} alt="posts" /> : */}
              <img className="w-20 h-20 rounded-full" src={'http://localhost:4000/images/'+user?.image} alt="posts" /> 
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{user?.username}</h2>
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <p>Email: {user?.email}</p>
              <p>Phone: {user?.phone}</p>
            </div>
            <div className="mt-4">
            <Link to={`/edituser/${user?._id}`}><button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit Profile
            </button></Link>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
