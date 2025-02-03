import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51QnJSnRBHdyrqudVztjucxatANlH1o5Mk0JnmbUOiAZHn24QuLJGDOgBR0C5YjgOdZu26fH2Rno8ljrtb8QMxNqc00F9977s8H');

const OrderFormModal = () => {
    const navigate = useNavigate();
    const tokenn = localStorage.getItem('token');
    const [amount, setAmount] = useState(); // Default: 100 INR
    const [OfferApplied, setOfferApplied] = useState(false);
    const [offerNum, setofferNum] = useState();
    // const [TotalPrice, setAmount] = useState();
    const [ItemData, setItemData] = useState([]);



    const getItemData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/cartitems`, { headers: { Authorization: `Bearer ${tokenn}` } });
            setItemData(response.data.cartItems);
            setOfferApplied(response.data.isOfferApplied);
            setofferNum(response.data.offerNum);
            // setAmount(total);
        }
        catch (error) {
            console.log("Error:", error);
        }
    }

    const total = ItemData.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const hasPizza = ItemData.filter(item => item.dishname === "Enchanting Pizza Palette");

    const hasNimbuPaani = ItemData.filter(item => item.dishname === "Nimbu Paani");
    const hasDessert = ItemData.filter(item => item.dishname === "Strawberry Ice Cream");
    const hasChholeBhature = ItemData.filter(item => item.dishname === "Spicy & Tangy Chole Bhature");

    const CalculateDiscount = async () => {

        try {
            if (OfferApplied) {
                switch (offerNum) {
                    case 0:
                        if (total > 299) {
                            setAmount(total * 0.5);
                        }
                        else {
                            setAmount(total);
                        }
                        break;
                    case 1:
                        if (hasPizza) {
                            const pizzaTotal = hasPizza.reduce((total, item) => {
                                return total + item.price * item.quantity;
                            }, 0);

                            const pizzaDiscount = pizzaTotal * (20 / 100);
                            setAmount(total - pizzaDiscount);
                        }
                        else {
                            setAmount(total);
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

                                    const hasZeroPriceItem = ItemData.some(item => item.price === 0);
                                    if (hasZeroPriceItem) {
                                        // console.log("Cart contains an item with price 0, skipping dessert addition.");
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
                                                    headers: { Authorization: `Bearer ${tokenn}` }
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
                            setAmount(total);
                        }
                        break;
                    case 3:
                        if (hasNimbuPaani) {
                            const BeverageTotal = hasNimbuPaani.reduce((total, item) => {
                                return total + item.price * item.quantity;
                            }, 0);

                            const BeverageDiscount = BeverageTotal * (25 / 100);
                            setAmount(total - BeverageDiscount);
                        }
                        else {
                            setAmount(total);
                        }
                        break;
                    case 4:
                        if (total > 500) {
                            if (hasDessert) {
                                const DessertTotal = hasDessert.reduce((total, item) => {
                                    return total + item.price * item.quantity;
                                }, 0);

                                const DessertDiscount = DessertTotal * (20 / 100);
                                setAmount(total - DessertDiscount);
                            }
                            else {
                                setAmount(total);
                            }
                        }
                        break;
                    case 5:
                        if (hasChholeBhature) {
                            const ItemTotal = hasChholeBhature.reduce((total, item) => {
                                return total + item.price * item.quantity;
                            }, 0);

                            const ItemDiscount = ItemTotal * (30 / 100);
                            setAmount(total - ItemDiscount);
                        }
                        else {
                            setAmount(total);
                        }
                        break;
                    default:
                        setAmount(total);
                        break;
                }
            }
            setAmount(total);
        }
        catch (err) {
            console.log("Error for offer calculation:", err);
        }
    }

    useEffect(() => {
        getItemData();
        CalculateDiscount();
    }, []);

    useEffect(() => {
        CalculateDiscount();
    }, [total])



    const handlePayment = async (event) => {
        event.preventDefault();

        const stripe = await stripePromise;

        // Convert amount to paise (1 INR = 100 paise)
        const amountInPaise = amount * 100;

        const { data } = await axios.post('http://localhost:5000/create-checkout-session', { amount: amountInPaise });

        const result = await stripe.redirectToCheckout({ sessionId: data.id });

        if (result.error) {
            alert(result.error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Payment Details</h2>
            <form onSubmit={handlePayment} className="border p-4 rounded shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Amount (INR):</label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-success w-100">Pay ₹{amount}</button>
            </form>
        </div>
    );
};

export default OrderFormModal;
