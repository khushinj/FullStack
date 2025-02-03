import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal';
import { AuthContext } from './AuthProvider.jsx';

export default function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState();
    const { setIsLoggedIn } = useContext(AuthContext);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();




    const fetchBookings = async () => {
        try {
            if (token) {
                const result = await axios.get(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/my-reservations`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // console.log(result.data);
                setBookings(result.data);
            }
        } catch (error) {
            setShowModal(true);
            console.log(error);
            setModalErrorMessage(
                error.response?.data?.message || error.message || 'Something went wrong. Try logging in again.'
            );
        }
    };


    const deleteBooking = async (date, time, DiningType) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/my-reservations`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { date, time, DiningType },
            });
            // console.log(res.data);
            setShowModal(true);
            setModalErrorMessage(res.data.message);
            fetchBookings();
        }
        catch (err) {
            console.log("Error while deleting:", err);
        }
    }


    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="container-fluid text-black mt-5 pt-3">
            <div className="row">
                <div className="col">
                    <h1 className="my-4 text-center">My Reservations</h1>
                    {loading ? (
                        <div className="text-center">Loading...</div>
                    ) : bookings.length > 0 ? (
                        <div className="row">
                            {bookings.map((booking, index) => (
                                <div key={index} className="col-lg-4 col-md-6 mb-4">
                                    <div className="card h-100 shadow-sm mx-xl-5 mx-md-2 mx-4 rounded-4">
                                        <div className="card-body">
                                            <h5 className="card-title text-center">Booking {index + 1}</h5>
                                            <p className="card-text mt-4">
                                                <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                                            </p>
                                            <p className="card-text">
                                                <strong>Time:</strong> {booking.time}
                                            </p>
                                            <p className="card-text">
                                                <strong>Number of Guests:</strong> {booking.NumberofGuests}
                                            </p>
                                            <p className="card-text">
                                                <strong>Dining Type:</strong> {booking.DiningType}
                                            </p>
                                            <p className="card-text">
                                                <strong>Special Requests:</strong> {booking.requests || 'None'}
                                            </p>

                                        </div>
                                        <button className='m-auto mb-4 mt-2 btn btn-danger' onClick={() => { deleteBooking(booking.date, booking.time, booking.DiningType) }}>Cancel Booking</button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <p className="text-center">No reservations found.</p>
                            <div className='text-center mt-5'>
                                <button className='reservation text-white p-2 border rounded-3' onClick={() => { navigate('/reservationform') }}>Make a reservation</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <Modal
                    title={modalErrorMessage}
                    // description="Try logging in again"
                    className="text-black"
                    OnModalClose={() => {
                        setIsLoggedIn(false);
                        setShowModal(false);
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }}
                />
            )}
        </div>
    );
}
