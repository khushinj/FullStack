import React from 'react';
import b2 from '../images/menubg.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Modal from './Modal';

export default function Signup() {

  const [uname, setuname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [responseMessage, setresponseMessage] = useState('');
  const [responseColor, setresponseColor] = useState('');

  const navigate = useNavigate();

  const Login = () => {
    navigate('/login');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/signupresult`, // Correct environment variable
        { uname, email, pass } // Send form data as the request body
      );
      console.log("response:", res.data);
      if (res.data === "Signed up successfully to Delicious!") {
        setresponseMessage(res.data); // Success message
        setresponseColor('success');
        setuname('');
        setpass('');
        setemail('');
      } else {
        setresponseColor('danger');
        setresponseMessage(res.data); // Error message
      }
      setresponseMessage(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div
      className="container-fluid vh-100 d-flex justify-content-center align-items-center text-black"
      style={{
        backgroundImage: `url(${b2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="row w-100 justify-content-center mt-5 pt-2">
        <div className="col-lg-4 col-md-6 col-sm-8 col-12 bg-white p-4 rounded-3 shadow">
          <h1 className="text-center">Create Your Account</h1>

          <form className="mt-4" method='post' onSubmit={handleSubmit}>
            <div className="mb-3">
              <button className="btn btn-outline-dark w-100 rounded-pill">Signup with Google</button>
            </div>

            <div className="d-flex align-items-center my-3">
              <hr className="flex-grow-1" />
              <span className="mx-2">or</span>
              <hr className="flex-grow-1" />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" name="uname" value={uname} id="name" onChange={(e) => setuname(e.target.value)} className="form-control" required />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" name="email" value={email} id="email" onChange={(e) => setemail(e.target.value)} className="form-control" required />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" name="pass" value={pass} onChange={(e) => setpass(e.target.value)} id="password" className="form-control" required />
            </div>

            <div className="form-check my-4">
              <input type="checkbox" id="terms" className="form-check-input" required />
              <label htmlFor="terms" name="terms" className="form-check-label ms-2">I agree to Terms & Conditions</label>
            </div>

            {responseMessage && (
              <p className={`text-${responseColor}`}>{responseMessage}</p>
            )}

            <button type="submit" className="btn btn-dark w-100">Sign Up</button>

            <h6 className='fw-normal justify-content-center mt-4 d-flex'>Already have an account?  <p className='ms-2 text-primary signup' onClick={() => { Login() }} >Login</p>  </h6>
          </form>


        </div>
      </div>


      {responseMessage === "Signed up successfully to Delicious!" &&
        <Modal description={"Signed up successfully"} />
      }
    </div >




  );
}
