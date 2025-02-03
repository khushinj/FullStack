import React, { useContext, useState, useEffect } from 'react';
import { countercontext } from '../App';
import axios from 'axios';
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { totalQuantityContext } from '../App.jsx';
import OrderFormModal from './Payment.jsx';
import { random } from 'gsap';
import Modal from './Modal.jsx';

export default function ShoppingCart() {
    const navigate = useNavigate();
    const [ItemData, setItemData] = useState([]);
    const { totalQuantity, settotalQuantity } = useContext(totalQuantityContext);
    const [TotalPrice, setTotalPrice] = useState();
    const tokenn = localStorage.getItem('token');
    const [showForm, setshowForm] = useState(false);
    const [offerNum, setofferNum] = useState(null);
    const [OfferApplied, setOfferApplied] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState();
    const [showModal, setshowModal] = useState(false);
    const [OfferName, setOfferName] = useState();
    const [Condition, setCondition] = useState();


    const apiUrl = process.env.REACT_APP_DELICIOUS_BACKEND_URL;

    const getItemData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/cartitems`, { headers: { Authorization: `Bearer ${tokenn}` } });
            // console.log("Itemdata:", response.data.cartItems);
            setItemData(response.data.cartItems);
        }
        catch (error) {
            console.log("Error:", error);
        }
    }

    const deleteItem = async (dishname) => {
        try {
            const item = await axios.delete(`${apiUrl}/cartitems/${dishname}`, { headers: { Authorization: `Bearer ${tokenn}` } });
            // console.log(`${dishname} deleted successfully`, item.data);
            getItemData();
        }
        catch (error) {
            console.log(("Error deleting item", error));
        }
    }

    const updateQuantity = async (dishname, newQuantity) => {
        try {
            const response = await axios.put(`${apiUrl}/cartitems/${dishname}`,
                { quantity: newQuantity },
                { headers: { Authorization: `Bearer ${tokenn}` } });
            // console.log("response:", response.data);
            getItemData();
        }
        catch (error) {
            console.log("Error:", error);
        }
    }


    const incrementQuantity = async (item) => {
        const newQuantity = item.quantity + 1;
        await updateQuantity(item.dishname, newQuantity);
    }

    const decrementQuantity = (item) => {
        if (item.quantity > 1) {
            const newQuantity = item.quantity - 1;
            updateQuantity(item.dishname, newQuantity);
        }
    }


    const total = ItemData.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const hasPizza = ItemData.filter(item => item.dishname === "Enchanting Pizza Palette");

    const hasNimbuPaani = ItemData.filter(item => item.dishname === "Nimbu Paani");
    const hasDessert = ItemData.filter(item => item.dishname === "Strawberry Ice Cream");
    const hasChholeBhature = ItemData.filter(item => item.dishname === "Spicy & Tangy Chole Bhature");

    const getOfferNum = async () => {
        try {
            const res = await axios.get(`${apiUrl}/cartitems/get-offerNum`, { headers: { Authorization: `Bearer ${tokenn}` } });
            // console.log("Response for getOffernum:", res.data);
            setofferNum(res.data.offerNum);
            setOfferApplied(res.data.isOfferApplied);
        }
        catch (err) {
            console.log("Error for getoffernum:", err);
        }
    }

    useEffect(() => {
        const total = ItemData.reduce((sum, item) => sum + item.quantity, 0);
        settotalQuantity(total);
    }, [ItemData]);


    useEffect(() => {
        const total = ItemData.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, [ItemData]);


    const removeOffer = async () => {
        try {
            const UpdateData = await axios.post(`${apiUrl}/cartitems/update-offer`, { isOfferApplied: false }, { headers: { Authorization: `Bearer ${tokenn}` } });
            console.log(UpdateData.data);
            setTotalPrice(total);
            setOfferName("None");
            setCondition('');
        }
        catch (err) {
            console.log(err);
        }
    }

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
                                    const res = await axios.get(`${apiUrl}/menuitem`);
                                    console.log("response:", res);
                                    const desserts = res.data.filter(item => item.id === 'desserts');

                                    const randomDessert = desserts[0]; // Assuming 'desserts' is a category with an array of items
                                    const dessertItems = randomDessert.items; // Ensure items exist
                                    if (!Array.isArray(dessertItems) || dessertItems.length === 0) {
                                        throw new Error("No items found in the 'desserts' category!");
                                    }

                                    const randomItem = dessertItems[Math.floor(Math.random() * dessertItems.length)];
                                    console.log("Random Dessert Item:", randomItem);

                                    const hasZeroPriceItem = ItemData.some(item => item.price === 0);
                                    if (hasZeroPriceItem) {
                                        console.log("Cart contains an item with price 0, skipping dessert addition.");
                                    } else {
                                        const postData = async (randomItem) => {
                                            try {
                                                const postResponse = await axios.post(`${apiUrl}/cart`, {
                                                    img: randomItem.link,
                                                    dishname: randomItem.dishname,
                                                    description: randomItem.description,
                                                    quantity: 1,
                                                    price: 0,
                                                }, {
                                                    headers: { Authorization: `Bearer ${tokenn}` }
                                                });

                                                console.log("Dessert added to cart:", postResponse.data);
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
            else {
                setOfferName("None");
                setCondition('');
            }
        }
        catch (err) {
            console.log("Error for offer calculation:", err);
        }
    }


    useEffect(() => {
        CalculateDiscount();
        Offer();
    }, [total, offerNum]);


    useEffect(() => {
        getItemData();
        getOfferNum();
    }, []);




    const Offer = async () => {
        if (OfferApplied) {
            switch (offerNum) {
                case 0:
                    setOfferName("50% Off on orders above ₹299");
                    setCondition("Condition: Only applicable if Grand Total exceeds ₹299");
                    break;
                case 1:
                    setOfferName("20% Off on Enchanting Pizza Palette");
                    setCondition("Condition: Only applicable if Pizza is added to your cart");
                    break;
                case 2:
                    setOfferName("Free Dessert on Orders above ₹299");
                    setCondition("Condition: Only applicable if Your grand total exceeds ₹299, applicable from 10PM - 12AM ");
                    break;
                case 3:
                    setOfferName("25% off on Nimbu Paani");
                    setCondition("Condition: Only applicable if Nimbu Paani is added to your cart");
                    break;
                case 4:
                    setOfferName("20% off on Strawberry Ice Cream");
                    setCondition("Condition: Only applicable if Grand Total exceeds ₹500");
                    break;
                case 5:
                    setOfferName("30% off on Chhole Bhature");
                    setCondition("Condition: Only applicable if Chhole Bhature is added to your cart");
                    break;
                default:
                    break;
            }
        }

    }

    const placeOrder = async () => {
        try {
            if (!TotalPrice) {
                setErrorMessage("Cannot place order! Your cart is empty.");
                setshowModal(true);
            }
            else {
                navigate('/payment');
                // setshowForm(true);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (


        <div className='container-fluid mt-5 pt-5'>
            <div className="text-center text-black mb-4">
                <h1>Shopping Cart</h1>
                <h5>Total Quantity: {totalQuantity} </h5>

            </div>
            {ItemData.length > 0 ? (
                <div className="row justify-content-center justify-content-xl-start">
                    {
                        ItemData.map((item) => (
                            <div className="col-xl-6 col-lg-8 col-11 text-black my-3">

                                <div className='border d-sm-flex rounded-4 d-none'>
                                    <img src={item.img} alt="" className='img-fluid rounded-start-4 cart-item-img' />
                                    <div className='ms-4 mt-2 col-7'>
                                        <h5>{item.dishname} - ₹{item.price * item.quantity}  </h5>
                                        <p>Quantity: {item.quantity}</p>
                                        <div>
                                            <button className='btn border pb-2' onClick={() => { decrementQuantity(item) }}> <TiMinus /> </button>
                                            <span className='mx-3'>{item.quantity}</span>
                                            <button className='btn border pb-sm-2' onClick={() => { incrementQuantity(item) }}> <FaPlus /> </button>
                                            <button className='btn btn-danger mx-md-5 mx-3' onClick={() => { deleteItem(item.dishname) }} >Remove</button>
                                        </div>
                                    </div>
                                </div>


                                <div className='border rounded-3 d-sm-none'>
                                    <img src={item.img} alt="" className='img-fluid  rounded-top-3 cart-item-img' />
                                    <div className='ms-4 mt-2'>
                                        <h5>{item.dishname} - ₹{item.price * item.quantity}  </h5>
                                        <p>Quantity: {item.quantity}</p>
                                        <div className='mb-4'>
                                            <button className='btn border pb-2' onClick={() => { decrementQuantity(item) }}> <TiMinus /> </button>
                                            <span className='mx-3'>{item.quantity}</span>
                                            <button className='btn border pb-sm-2' onClick={() => { incrementQuantity(item) }}> <FaPlus /> </button>
                                            <button className='btn btn-danger mx-3 removebtn' onClick={() => { deleteItem(item.dishname) }} >Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }


                    <h5 className='text-black text-center mt-5 pt-2 pb-4'>Your Grand total would be : ₹{TotalPrice} </h5>
                </div>
            ) : (
                <div>
                    <p className='text-black text-center fs-5'>Your cart is empty. Add some items!</p>
                </div>
            )}


            <div className='text-center text-black '>
                <h5 className='fs-6'>Offer Applied: {OfferName}</h5>
                <h5 className='fs-6'>{Condition} </h5>
            </div>
            <div className='row justify-content-center mb-5'>
                <button className='btn btn-danger border col-md-3 col-lg-2 col-sm-3 col-5' onClick={removeOffer}>Remove Offer</button>
            </div>


            <div className='row justify-content-center mb-5'>
                <button className='btn btn-success col-md-3 col-lg-2 col-sm-3 col-5' onClick={placeOrder}>Place order</button>
            </div>

            {/* {showForm && (
                <OrderFormModal formCondition={showForm} closeModal={() => setshowForm(false)} />
            )} */}

            {ErrorMessage && showModal && (
                <Modal title={ErrorMessage} description="Add items to your cart before moving ahead!." OnModalClose={() => { setshowModal(false) }} />
            )}

        </div >
    );
}
