import React from 'react';
import useIsLogout from '../customHook/useIsLogout';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  useIsLogout();

  const { user } = useSelector((state) => state.auth);
  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-white shadow p-6 rounded-lg">
          <div className="bg-white shadow p-6 rounded-lg">
            <div className="flex items-center">
              {user?.img && <img
                src={user?.img}
                alt="User Avatar"
                className="w-16 h-16 rounded-full"
              />}
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{user.username}</h2>
                <input type="file" />
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default UserProfile;
