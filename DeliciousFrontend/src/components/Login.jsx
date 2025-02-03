import React, { useState, useContext } from 'react';
import b2 from '../images/menubg.png';
import GoogleIcon from '../images/GoogleIcon.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './AuthProvider';
import Modal from './Modal'; // Import the Modal component

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { setIsLoggedIn } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSignupRedirect = () => {
        navigate('/signup');
    };

    const handleResponse = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/loginresult`, { email, password });
            // console.log('Response:', res.data);
            if (res.data.message === "Logged in successfully") {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('UserEmail', email);
                setResponseMessage('Login successful!');
                setIsLoggedIn(true);
                setShowModal(true);
            }
            else {
                setResponseMessage(res.data);
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseMessage('Login failed. Please try again.');
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
                    <h1 className="text-center">Welcome Back</h1>
                    <p className="text-center">Please Enter Your Details</p>

                    <form className="mt-4" onSubmit={handleResponse}>
                        {/* <div className="mb-3">
                            <button className="btn btn-outline-dark w-100 rounded-pill login">
                                <img src={GoogleIcon} className="GoogleIcon me-1" alt="Google Icon" /> Login with Google
                            </button>
                        </div> */}

                        {/* <div className="d-flex align-items-center my-3">
                            <hr className="flex-grow-1" />
                            <span className="mx-2">or</span>
                            <hr className="flex-grow-1" />
                        </div> */}

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-label="Enter your email"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-label="Enter your password"
                            />
                        </div>

                        {responseMessage && (
                            <div className="mt-3 text-center">
                                <p className={responseMessage.includes('successful') ? 'text-success' : 'text-danger'}>
                                    {responseMessage}
                                </p>
                            </div>
                        )}

                        <button type="submit" className="btn btn-dark w-100">Login</button>

                        <h6 className="fw-normal justify-content-center mt-4 d-flex">
                            Don't have an account?{' '}
                            <p className="ms-2 text-primary signup" onClick={handleSignupRedirect} style={{ cursor: 'pointer' }}>
                                Signup
                            </p>
                        </h6>
                    </form>
                </div>
            </div>

            {showModal && (
                <Modal
                    description="You have successfully logged in!" OnModalClose={navigate('/menu')}
                />
            )}
        </div>
    );
}
