import React from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { useNavigate } from 'react-router-dom';
import user from '../images/Ellipse 4.png';

export default function UserProfile() {

    const navigate = useNavigate();
    const { isLoggedin, setIsLoggedIn } = useContext(AuthContext);
    const mail = localStorage.getItem('UserEmail');

    const handleLogout = () => {
        setIsLoggedIn(false);
        // console.log(localStorage.getItem('token'));
        localStorage.clear();
    }

    return (
        <div className='container-fluid text-center mt-5 pt-5'>
            <img src={user} alt="" className='border rounded-circle border-3 border-dark' height={100} />
            <h4 className='text-black text-center'>Logged in as <p>{mail}</p> </h4>
            <div className='border rounded-4 col-lg-6 col-xl-4 col-md-7 col-sm-9 col-11 m-auto px-5 mt-5'>
                <button className='border rounded-3 p-2 col-12 my-4' onClick={() => { navigate('/UserProfile/track-order') }}>Track my Order</button>
                <button className='border rounded-3 p-2 col-12 my-4' onClick={() => { navigate('/UserProfile/order-bill') }}>My Order Receipt</button>
                <button className='border rounded-3 p-2 col-12 my-4' onClick={() => { navigate('/UserProfile/my-reservations') }} >My reservations</button>
                <button className='btn border btn-danger col-12 my-4' onClick={handleLogout}>Log out</button>
            </div>
        </div>
    )
}