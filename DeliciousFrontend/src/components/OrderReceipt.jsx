import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const [OrderItems, setOrderItems] = useState([]);
    const [TotalPrice, setTotalPrice] = useState(0);
    const [offerNum, setofferNum] = useState(null);
    const [OfferApplied, setOfferApplied] = useState(false);

    const token = localStorage.getItem('token');

    const OrderInfo = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/cartitems`, { headers: { Authorization: `Bearer ${token}` } });
            setOrderItems(response.data.cartItems);
            setofferNum(response.data.offerNum);
            setOfferApplied(response.data.isOfferApplied);
        }
        catch (error) {
            console.log("Error:", error);
        }
    }


    const total = OrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const hasPizza = OrderItems.filter(item => item.dishname === "Enchanting Pizza Palette");

    const hasNimbuPaani = OrderItems.filter(item => item.dishname === "Nimbu Paani");
    const hasDessert = OrderItems.filter(item => item.dishname === "Strawberry Ice Cream");
    const hasChholeBhature = OrderItems.filter(item => item.dishname === "Spicy & Tangy Chole Bhature");

    const CalculateDiscount = async () => {
        try {
            if (OfferApplied) {
                switch (offerNum) {
                    case 0:
                        if (total > 299) {
                            setTotalPrice(total * 0.5);
                        }
                        else {
                            setTotalPrice(total);
                        }
                        break;
                    case 1:
                        if (hasPizza) {
                            const pizzaTotal = hasPizza.reduce((total, item) => {
                                return total + item.price * item.quantity;
                            }, 0);

                            const pizzaDiscount = pizzaTotal * (20 / 100);
                            setTotalPrice(total - pizzaDiscount);
                        }
                        else {
                            setTotalPrice(total);
                        }
                        break;
                    case 2:
                        const currentTime = new Date();

                        if (currentTime.getHours() >= 22 || currentTime.getHours() < 12) {
                            if (total > 299) {
                                try {
                                    const res = await axios.get(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/menuitem`);
                                    // console.log("response:", res);
                                    const desserts = res.data.filter(item => item.id === 'desserts');

                                    const randomDessert = desserts[0]; // Assuming 'desserts' is a category with an array of items
                                    const dessertItems = randomDessert.items; // Ensure items exist
                                    if (!Array.isArray(dessertItems) || dessertItems.length === 0) {
                                        throw new Error("No items found in the 'desserts' category!");
                                    }

                                    const randomItem = dessertItems[Math.floor(Math.random() * dessertItems.length)];
                                    // console.log("Random Dessert Item:", randomItem);

                                    const hasZeroPriceItem = OrderItems.some(item => item.price === 0);
                                    if (hasZeroPriceItem) {
                                        console.log("Cart contains an item with price 0, skipping dessert addition.");
                                    } else {
                                        const postData = async (randomItem) => {
                                            try {
                                                const postResponse = await axios.post(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/cart`, {
                                                    img: randomItem.link,
                                                    dishname: randomItem.dishname,
                                                    description: randomItem.description,
                                                    quantity: 1,
                                                    price: 0,
                                                }, {
                                                    headers: { Authorization: `Bearer ${token}` }
                                                });

                                                // console.log("Dessert added to cart:", postResponse.data);
                                            } catch (error) {
                                                console.error("Error adding dessert to cart:", error);
                                            }
                                        };
                                        await postData(randomItem);

                                        // if (OfferApplied === false) {
                                        //     deleteItem(randomItem.dishname);
                                        // }
                                    }
                                } catch (error) {
                                    console.error("Error fetching menu items:", error);
                                }
                            }
                        } else {
                            setTotalPrice(total);
                        }
                        break;
                    case 3:
                        if (hasNimbuPaani) {
                            const BeverageTotal = hasNimbuPaani.reduce((total, item) => {
                                return total + item.price * item.quantity;
                            }, 0);

                            const BeverageDiscount = BeverageTotal * (25 / 100);
                            setTotalPrice(total - BeverageDiscount);
                        }
                        else {
                            setTotalPrice(total);
                        }
                        break;
                    case 4:
                        if (total > 500) {
                            if (hasDessert) {
                                const DessertTotal = hasDessert.reduce((total, item) => {
                                    return total + item.price * item.quantity;
                                }, 0);

                                const DessertDiscount = DessertTotal * (20 / 100);
                                setTotalPrice(total - DessertDiscount);
                            }
                            else {
                                setTotalPrice(total);
                            }
                        }
                        break;
                    case 5:
                        if (hasChholeBhature) {
                            const ItemTotal = hasChholeBhature.reduce((total, item) => {
                                return total + item.price * item.quantity;
                            }, 0);

                            const ItemDiscount = ItemTotal * (30 / 100);
                            setTotalPrice(total - ItemDiscount);
                        }
                        else {
                            setTotalPrice(total);
                        }
                        break;
                    default:
                        setTotalPrice(total);
                        break;
                }
            }
        }
        catch (err) {
            console.log("Error for offer calculation:", err);
        }
    }

    useEffect(() => {
        if (OrderItems.length > 0) {
            const total = OrderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            setTotalPrice(total);
        }
    }, [OrderItems, OfferApplied]);


    useEffect(() => {
        OrderInfo();
        CalculateDiscount();
    }, []);

    const address = localStorage.getItem('address');
    const contactNum = localStorage.getItem('contactnum');
    const name = localStorage.getItem("customerName");

    const orderDetails = {
        orderNumber: "ORD1895",
        customerName: name,
        deliveryAddress: address,
        contact: contactNum,
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
                <h4 className="mt-3">Total amount paid (after discount): ₹{TotalPrice}</h4>
            </div>

            <div className="delivery-info mt-4 border p-4 rounded">
                <h3>Delivery Information</h3>
                <p><strong>Estimated Delivery Time:</strong> {orderDetails.estimatedDeliveryTime}</p>
            </div>

            <div className="actions my-4 text-center">
                <button className="btn btn-primary mx-2" onClick={() => navigate('/UserProfile/track-order')}>
                    Track My Order
                </button>
                <button className="btn btn-secondary mx-2" onClick={() => navigate('/menu')}>
                    Back to Menu
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmation;
