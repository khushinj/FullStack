import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const [OrderItems, setOrderItems] = useState([]);
    const [TotalPrice, setTotalPrice] = useState(0);

    const token = localStorage.getItem('token');

    const OrderInfo = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/cartitems`, { headers: { Authorization: `Bearer ${token}` } });
            setOrderItems(response.data.cartItems);
        }
        catch (error) {
            console.log("Error:", error);
        }
    }


    useEffect(() => {
        if (OrderItems.length > 0) {
            const total = OrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotalPrice(total);
        }
    }, [OrderItems]);


    useEffect(() => {
        OrderInfo();
    }, []);



    const orderDetails = {
        orderNumber: "ORD12345",
        customerName: "Khushi Joshi",
        deliveryAddress: "123, Food Street, Mumbai",
        contact: "+91 8879773066",
        estimatedDeliveryTime: "30 minutes",
    };

    return (
        <div className="container mt-5 pt-5 text-black">
            <div className="text-center">
                <h1>Order Confirmed!</h1>
                <p>Your order has been placed successfully.</p>
            </div>

            <div className="order-summary mt-4 border p-4 rounded">
                <h3>Order Summary</h3>
                <p><strong>Order Number:</strong> {orderDetails.orderNumber}</p>
                <p><strong>Name:</strong> {orderDetails.customerName}</p>
                <p><strong>Delivery Address:</strong> {orderDetails.deliveryAddress}</p>
                <p><strong>Contact:</strong> {orderDetails.contact}</p>

                <h5 className="mt-3">Items Ordered:</h5>
                <ul>

                    {OrderItems.map((item, index) => (
                        <li key={index}>
                            {item.dishname} - {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
                        </li>
                    ))}
                </ul>
                <h4 className="mt-3">Total Amount: ₹{TotalPrice}</h4>
            </div>

            <div className="delivery-info mt-4 border p-4 rounded">
                <h3>Delivery Information</h3>
                <p><strong>Estimated Delivery Time:</strong> {orderDetails.estimatedDeliveryTime}</p>
            </div>

            <div className="actions my-4 text-center">
                <button className="btn btn-primary mx-2" onClick={() => navigate('/track-order')}>
                    Track Order
                </button>
                <button className="btn btn-secondary mx-2" onClick={() => navigate('/menu')}>
                    Back to Menu
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmation;
