import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import logo from '../images/Ellipse 2.png';
import '../App.css';
import { Link } from 'react-router-dom';
import bb from '../images/burger-bar.png';
import user from '../images/Ellipse 4.png';
import './Shopcart.jsx';
import { AuthContext } from './AuthProvider.jsx';
import { useEffect } from 'react';
import { totalQuantityContext } from '../App.jsx';


export default function Navbar() {

  const { totalQuantity } = useContext(totalQuantityContext);
  const { setIsLoggedIn } = useContext(AuthContext);


  const token = localStorage.getItem('token');


  const [activeTab, setactiveTab] = useState(null);


  const [search, setsearch] = useState(false);

  function onsearch(e) {
    setsearch(!search);
    e.preventDefault();
  }


  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }

  }, []);




  return (
    <div className="container-fluid">

      <nav className="navbar navbar-expand-lg text-light fixed-top  lh-1 pt-3 px-md-3 d-flex" id="navbar">

        <div className="container-fluid">


          <a className="navbar-brand fw-bold text-light logopart p-1 flex-grow-1" href="/">
            <img src={logo} alt="logo" height="40em"
              width="40em" />&nbsp;Delicious</a>




          <button className="navbar-toggler order-1" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
            aria-label="Toggle navigation">
            <span><img src={bb} alt="" className="navbar-toggler-icon" /></span>
          </button>


          <div className="collapse navbar-collapse justify-content-center order-lg-1 order-2 pt-lg-0  pt-3" id="navbarNavAltMarkup">
            <div className="navbar-nav text-center ms-lg-5 poppins">

              <Link className={`nav-link home  fs-4 rounded px-5 px-lg-4 p-2 me-lg-3 px-xl-5 ${activeTab === 'Home' ? 'active' : ''}`}
                aria-current="page" to="/" onClick={() => { setactiveTab('Home') }}>Home
              </Link>

              {/* <HashLink smooth to="/menu" className='nounderline'> */}
              <Link className={`nav-link menu fs-4 px-5 px-lg-4 px-xl-5 ${activeTab === 'Menu' ? 'active' : ''}`} to="/menu" onClick={() => { setactiveTab('Menu') }}>Menu</Link>
              {/* </HashLink> */}


              <Link className={`nav-link offers px-5 fs-4 px-lg-4 px-xl-5 ${activeTab === 'Dine-In' ? 'active' : ''}`} to="/dine-in" onClick={() => { setactiveTab('Dine-In') }}>Dine-In</Link>


              <Link className={`nav-link fs-4 px-5 px-lg-4 px-xl-5 ${activeTab === 'Contact Us' ? 'active' : ''}`} to="/contactus" onClick={() => { setactiveTab('Contact Us') }}>Contact Us</Link>


            </div><br />
          </div>



          <div className="collapse navbar-collapse justify-content-center justify-content-lg-end me-n5 gap-4 order-lg-2 order-1 navbar-nav text-center "
            id="navbarNavAltMarkup">



            {/* <span className="mb-lg-0 mb-md-2 order-1 order-lg-1 d-lg-flex d-none search" search={search} onClick={onsearch}><i className="bi bi-search fs-3 text-light"></i></span>
            {search && (
              <div className="container-fluid" align='center'>
                <form className="d-flex " role="search">
                  <input className="form-control me-2 rounded" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
              </div>
            )} */}

            {token && (
              <Link className="mb-0 order-3 order-lg-2 d-lg-flex d-none" to='/shopcart'><i className="bi bi-cart2 fs-2 text-light px-3 cart-icon-container" ><button className='rounded-circle btn-sm text-center sm-cart-counter'>{totalQuantity}</button></i>
              </Link>
            )}


            {!token ? (
              <Link to='/login'>
                <button className='bg-light text-black btn me-n5 d-none d-lg-flex order-1 order-lg-3 user'>Login</button>
              </Link>
            ) : (
              <Link to='/UserProfile' className="me-n5 order-1 order-lg-3 user"><img src={user} alt="" height={40} /></Link>
            )}
          </div>

          <div className='d-flex d-lg-none'>
            {/* <a href="/" className="mb-0 order-2 order-lg-2 search" search={search} onClick={onsearch}><i className="bi bi-search fs-3 text-light"></i></a> */}

            {token ? (
              <Link className="mb-0 order-3 order-lg-2" to='/shopcart'><i className="bi bi-cart2 fs-2 text-light px-3" ><button className='rounded-circle btn-sm sm-cart-counter'>{totalQuantity}</button></i></Link>
            ) : (
              <Link to='/login' className='order-3 mx-3'>
                <button className='bg-light text-black btn me-n5 order-3 user'>Login</button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,  //Makes it Compulsory (if value is not given, here default is there hence no issue)
  Option1: PropTypes.string
}

Navbar.defaultProps = {
  title: 'Enter your Logo here',
  Option1: 'Enter about text here'
}