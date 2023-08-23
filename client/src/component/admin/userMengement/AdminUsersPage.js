import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setUsersData, clearUserData } from '../../../Redux/usersSlice';
import {Link } from "react-router-dom";
const AdminUsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    FetchUsers();
    // ClearUsersData()
  }, [])
  const dispatch = useDispatch();

  const ClearUsersData = () => {
    dispatch(clearUserData());
  }

  const FetchUsers = async () => {
    try {
      await axios.get('http://localhost:4000/admin/users')
        .then((res) => {
          dispatch(setUsersData(res.data.usersData));
        })
        .catch((err) => {
          console.log(err);
        })
    } catch (error) {
      console.log()
    }
  }
  const { users } = useSelector((state) => state.users);
  console.log(users, ' ddddddddd')
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // return item?.title.toLowerCase().match(text.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
      <Link to='/admin/adduser' ><button className="rounded-md m-3 px-4 bg-indigo-500 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400">
            Add User
          </button></Link> 
        <h1 className="text-2xl font-semibold mb-4">Users List</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by username"
            className="rounded-l-md flex-1 py-2 px-4 border-t border-b border-l text-gray-800 bg-white border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          />
          <button
            className="rounded-r-md px-4 bg-indigo-500 text-white font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
          >
            Search
          </button>
        </div>
        <ul className="grid grid-cols-1 gap-4">
          {users.map((item,index) => {
            return (<div key={item._id} className='text-green-800'>
              <span className='text-red-800 px-4 '>no: {index+1} Username : {item.username}</span>
              <span>Email :{item.email}</span>
              <Link className='px-6 text-yellow-600' to={`/viewuserdetails/${item._id}`} >view</Link>
              {item.status ? <Link to={`/admin/action/${item._id}`}><button>BLOCK</button></Link>: <Link to={`/admin/action/${item._id}`}><button>UNBLOCK</button></Link>}
            </div>)
          })
          }
        </ul>
      </div>
    </div>
  );
};

export default AdminUsersPage;
