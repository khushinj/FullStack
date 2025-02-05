import React, { useState } from 'react';
import Footer from './Footer';
import axios from 'axios';
import Modal from './Modal';

export default function Contactus() {
    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [message, setmessage] = useState('');
    const [responseMessage, setresponseMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/contactus`, {
                fname, lname, email, phone, message
            });
            setresponseMessage(response.data.message); // Use response message or a default
            setIsModalOpen(true);
            setfname('');
            setlname('');
            setemail('');
            setphone('');
            setmessage('');
        } catch (error) {
            setresponseMessage('An error occurred. Please try again later.');
            setIsModalOpen(true);
            console.error('Error:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="container-fluid">
                <div className="row justify-content-center justify-content-xl-start text-black my-5 py-5">
                    <div className="col-lg-5 mx-lg-5 my-5 col-sm-11">
                        <h1 className='ms-sm-5 ms-2 display-3 fw-semibold'>Contact Us</h1>
                        <div className="mt-3 col-8 ms-sm-5 ms-2">
                            <p> Our support team is available around the clock to address any concerns or queries you may have</p>
                        </div>
                        <div className="info ms-sm-5 ms-2 mt-4">
                            <h5 className='fw-normal'>support@deliciousapp.com</h5>
                            <h5 className='fw-normal pt-3'>8724179XXX</h5>
                        </div>
                    </div>

                    <div className="col-lg-5 col-sm-10 mt-4 mx-lg-0 mx-2">
                        <form method='post' onSubmit={handleData} className='mx-lg-5 border rounded-3'>
                            <div className="content mx-4">
                                <h1 className='mt-4'>Get in Touch</h1>
                                <p>You can reach us anytime.</p>
                                <div className="row rounded-pill">
                                    <div className="input-group mb-3 col mt-5">
                                        <input
                                            type="text"
                                            className='form-control col-4 rounded-pill'
                                            value={fname}
                                            onChange={(e) => setfname(e.target.value)}
                                            placeholder='First name'
                                            name='fname'
                                            required
                                        />
                                    </div>
                                    <div className="input-group mb-3 col mt-5">
                                        <input
                                            type="text"
                                            className='form-control col-4 rounded-pill'
                                            value={lname}
                                            onChange={(e) => setlname(e.target.value)}
                                            placeholder='Last name'
                                            name='lname'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="basic-addon1">📧</span>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                            placeholder="Your email"
                                            name='email'
                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group mb-3">
                                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">+91</button>
                                        <ul className="dropdown-menu">
                                            <li className='mx-2 dropdown-item'>+82</li>
                                            <li className='mx-2 dropdown-item'>+102</li>
                                            <li className='mx-2 dropdown-item'>+12</li>
                                            <li className='mx-2 dropdown-item'><hr className="dropdown-divider" /></li>
                                            <li className='mx-2 dropdown-item'>Separated link</li>
                                        </ul>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={phone}
                                            onChange={(e) => setphone(e.target.value)}
                                            placeholder='Phone number'
                                            name='phone'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-group">
                                        <textarea
                                            className="form-control mb-3 rounded-3"
                                            value={message}
                                            onChange={(e) => setmessage(e.target.value)}
                                            placeholder='How can we help?'
                                            name='message'
                                            aria-label="Message"
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <button className="btn btn-primary rounded-pill" type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />

            {isModalOpen && (
                <Modal description={responseMessage} title={'Thank you for reaching out!'} OnModalClose={closeModal} />
            )}
        </div>
    );
}
