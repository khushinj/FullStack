import React, { useState } from "react";
import Footer from './Footer';
import axios from "axios";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

export default function ReservationForm() {


    const token = localStorage.getItem('token');

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [date, setdate] = useState();
    const [time, settime] = useState();
    const [NumberofGuests, setNumberofGuests] = useState();
    const [DiningType, setDiningType] = useState('');
    const [SpecialRequest, setSpecialRequest] = useState('');
    const [showModal, setshowModal] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState();
    const [previousReservation, setpreviousReservation] = useState();
    const navigate = useNavigate();

    const ClearData = () => {
        setname('');
        setphone('');
        setemail('');
        setDiningType('');
        setNumberofGuests('');
        setSpecialRequest('');
        setdate('');
        settime('');
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/reservation`, {
                name, email, phone, date, time, NumberofGuests, DiningType, SpecialRequest
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            // console.log("Response of Reservation:", response.data);
            setshowModal(true);
            setErrorMessage(response.data.message);
        }
        catch (err) {
            console.log("Error is:", err);
            setshowModal(true);
            setErrorMessage(err.message);
        }
    }


    return (
        <div className="container-fluid">
            <div className="row text-black my-5 py-5">
                <div className="col-lg-5 mx-sm-5 my-5">
                    <h1 className="ms-5 display-3 fw-semibold">Reserve a Table</h1>
                    <div className="mt-3 col-8 ms-5">
                        <p>
                            Plan ahead for an amazing dining experience. Reserve your table
                            now and enjoy a delightful meal with us.
                        </p>
                    </div>
                </div>

                <div className="col-lg-5 form mt-4 mx-lg-0 mx-2 ">
                    <form className="mx-sm-5 me-2 me-sm-0 border rounded-3" onSubmit={handleSubmit}>
                        <div className="content mx-4">
                            <h1 className="mt-4">Book Your Table</h1>
                            <p>We look forward to serving you!</p>
                            <div className="row">
                                <div className="input-group mb-3 col mt-5">
                                    <input
                                        type="text"
                                        className="form-control col-4 rounded-pill"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => { setname(e.target.value) }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="email-addon">
                                        📧
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Your Email"
                                        aria-label="Email"
                                        aria-describedby="email-addon"
                                        value={email}
                                        onChange={(e) => { setemail(e.target.value) }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <button
                                        className="btn btn-outline-secondary dropdown-toggle"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        +91
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li className="dropdown-item">+44</li>
                                        <li className="dropdown-item">+1</li>
                                        <li className="dropdown-item">+82</li>
                                    </ul>
                                    <input
                                        type="number"
                                        className="form-control"
                                        aria-label="Phone number"
                                        placeholder="Phone Number"
                                        value={phone}
                                        onChange={(e) => { setphone(e.target.value) }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="date-addon">
                                        📅
                                    </span>
                                    <input
                                        type="date"
                                        className="form-control"
                                        aria-label="Reservation Date"
                                        aria-describedby="date-addon"
                                        value={date}
                                        onChange={(e) => { setdate(e.target.value) }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="time-addon">
                                        ⏰
                                    </span>
                                    <input
                                        type="time"
                                        className="form-control"
                                        aria-label="Reservation Time"
                                        aria-describedby="time-addon"
                                        value={time}
                                        onChange={(e) => { settime(e.target.value) }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <select className="form-select rounded-pill" value={NumberofGuests} onChange={(e) => { setNumberofGuests(e.target.value) }} required>
                                        <option value="">Select Number of Guests</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5+">5+</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-group mb-3">
                                    <select className="form-select rounded-pill" value={DiningType} onChange={(e) => { setDiningType(e.target.value) }} required>
                                        <option value="">Type of Dining</option>
                                        <option value="Normal Dining">Normal Dining</option>
                                        <option value="Outdoor Dining">Outdoor Dining</option>
                                        <option value="Rooftop Dining">Rooftop Dining</option>
                                        <option value="Private Dining">Private Dining</option>
                                        <option value="Candlelit Dining">Candlelit Dining</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-group">
                                    <textarea
                                        className="form-control mb-3 rounded-3"
                                        aria-label="Special Requests"
                                        placeholder="Special Requests (Optional)"
                                        value={SpecialRequest}
                                        onChange={(e) => { setSpecialRequest(e.target.value) }}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <button
                                    className="btn btn-primary rounded-pill w-100"
                                    type="submit"
                                >
                                    Reserve Now
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>


            <Footer />

            {/* We’re excited to serve you! 😊 */}
            {showModal && (
                <Modal
                    title={ErrorMessage}
                    description="You can check your reservations in profile. "
                    OnModalClose={() => {
                        setshowModal(false);
                        ClearData();
                        setTimeout(() => {
                            navigate('/UserProfile/my-reservations')
                        }, 50);
                    }}
                />
            )}
        </div>
    );
}
