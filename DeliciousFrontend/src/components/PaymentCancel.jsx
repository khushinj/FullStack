import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentCancel() {
    const navigate = useNavigate();
    return (
        <div>
            <div class="container mt-5 pt-5">
                <div class="alert alert-danger rounded-4 mt-3 text-center" role="alert">
                    <h4 class="alert-heading">Payment Canceled</h4>
                    <p>Unfortunately, your payment could not be processed after submission.</p>
                    <p>Please review your payment details or try again with a different method.</p>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-primary" onClick={()=>{navigate('/payment')}} >Retry Payment</button>
                        <button class="btn btn-secondary mx-2" onClick={()=>{navigate('/shopcart')}} >Back to Cart</button>
                        <button class="btn btn-info mx-2" onClick={()=>{navigate('/contactus')}} >Contact Support</button>
                    </div>
                    <p class="mt-3">If the problem persists, please contact our support team with your transaction reference ID: <strong>#12345</strong></p>
                </div>
            </div>
        </div>
    )
}
