import './App.css';
import Navbar from './components/navbar.jsx';
import Home from './components/home.jsx';
import Menu from './components/menu.jsx';
import Contactus from './components/contactus.jsx';
import Dinein from './components/Dine_in.jsx';
import ReservationForm from './components/ReservationForm.jsx';
import './App.css';
import AOS from 'aos';
import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sc from './components/Shopcart.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import { AuthProvider } from './components/AuthProvider.jsx';
import FeedbackForm from './components/Feedback.jsx';
import UserProfile from './components/UserProfile.jsx';
import OrderReceipt from './components/OrderReceipt.jsx';
import TrackOrder from './components/TrackOrder.jsx';
import MyBookings from './components/MyBookings.jsx';
import Payment from './components/Payment.jsx';
import PaymentCancel from './components/PaymentCancel.jsx';

export const countercontext = createContext('');
export const imgcontext = createContext(0);
export const totalQuantityContext = createContext();


function App() {

  const [totalQuantity, settotalQuantity] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  // const stripePromise = loadStripe('pk_test_51QnJSnRBHdyrqudVztjucxatANlH1o5Mk0JnmbUOiAZHn24QuLJGDOgBR0C5YjgOdZu26fH2Rno8ljrtb8QMxNqc00F9977s8H');


  return (

    <>
      <Router>
        <AuthProvider>
          <totalQuantityContext.Provider value={{ totalQuantity, settotalQuantity }}>
            <Navbar />
            {/* <Elements stripe={stripePromise}>
              <OrderFormModal formCondition={true} closeModal={() => { }} />
            </Elements> */}
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/shopcart" element={<Sc />} />
              <Route path="/contactus" element={<Contactus />} />
              <Route path="/dine-in" element={<Dinein />} />
              <Route path="/dine-in/reservationform" element={<ReservationForm />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feedbackform" element={<FeedbackForm />} />
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/UserProfile/order-bill" element={<OrderReceipt />} />
              <Route path="/UserProfile/track-order" element={<TrackOrder />} />
              <Route path="/UserProfile/my-reservations" element={<MyBookings />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment-success" element={<h2>Payment Successful!</h2>} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
            </Routes>
          </totalQuantityContext.Provider>
        </AuthProvider>
      </Router>



    </>

  );
}

export default App;


