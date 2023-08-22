import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useIsLogout from '../customHook/useIsLogout';

function Home(){
    useIsLogout()
    const data = localStorage.getItem('user');
    console.log(data);
    return (
        <h1>Home</h1>
    )
}

export default Home;