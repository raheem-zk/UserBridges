import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUser } from "../Redux/userAuth";
import { Link, useNavigate } from "react-router-dom";
import useIsLogin from "../customHook/useIsLogin";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    useIsLogin();
  
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(email ==='' || password===''){
            setErr('Please fill in all fields')
            return;
        }
        try {
            await axios.post('http://localhost:4000/login',{email, password})
            .then((res)=>{
                console.log(res);
                if(res.data.message==='success'){
                  // alert(res.data.message)
                  dispatch(setUser({user: res.data.userData, token:res.data.token }))
                  const token = res.data.token;

                  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                  
                  console.log('token', token);
                  localStorage.setItem('token', token);
                  navigate('/');
                }else{
                  setErr(res.data.message);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <p className={`text-red-700 ${err ? '' : 'hidden'}`}>{err}</p>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
                <Link to="/signup" className="mt-3">Sign Up</Link>
              </div>
            </form>
          </div>
        </div>
      );
}

export default Login;