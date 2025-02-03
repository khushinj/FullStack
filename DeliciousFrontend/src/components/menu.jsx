import React, { useRef, useState, useEffect, useContext } from 'react';
import '../App.css';
import './Shopcart.jsx';
// import { countercontext } from '../App';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import Offers from './Offers';
import Footer from './Footer';
import { IoIosArrowBack } from "react-icons/io";
import { totalQuantityContext } from '../App.jsx';
import Menuskeleton from './Menuskeleton';
import axios from 'axios';
import Modal from './Modal.jsx';
import { AuthContext } from './AuthProvider.jsx';


const token = localStorage.getItem('token');
const apiUrl = process.env.REACT_APP_DELICIOUS_BACKEND_URL;


gsap.registerPlugin(CustomEase);

export default function Menu() {
    const [itemcounter, setItemcounter] = useState(Array(73).fill(1));
    const { setIsLoggedIn } = useContext(AuthContext);
    const [isLoading, setisLoading] = useState(true);
    const [menuData, setmenuData] = useState([]);
    const [cartItem, setcartItem] = useState([]);
    const { totalQuantity, settotalQuantity } = useContext(totalQuantityContext);
    const [showModal, setshowModal] = useState(false);
    const [ModalErrorMessage, setModalErrorMessage] = useState();
    const [modalMessage, setModalMessage] = useState(null);
    const [errorModal, seterrorModal] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setisLoading(false);
        }, 800);
        return () => clearTimeout(timer);

    }, []);



    useEffect(() => {
        const response = async () => {
            try {
                const res = await axios.get(`${apiUrl}/menuitem`);
                // console.log("response:", res);
                setmenuData(res.data);
            }
            catch (error) {
                console.error("Error:", error);
            }
        }
        response();

    }, []);



    function increment(id) {
        setItemcounter((prevItems) => {
            prevItems[id] = prevItems[id] + 1;
            return [...prevItems];
        })
    }

    function decrementit(id) {
        setItemcounter((prevItems) => {
            if (prevItems[id] > 0) {
                prevItems[id] = prevItems[id] - 1;
            }
            return [...prevItems];
        })
    }

    const addtocart = async (item) => {
        try {
            if (token) {
                const response = await axios.post(`${apiUrl}/cart`, {
                    dishname: item.dishname,
                    img: item.link,
                    description: item.description,
                    quantity: itemcounter[item.counter],
                    price: item.price,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                // console.log("items added to cart:", response.data);
                setcartItem(response.data);
                settotalQuantity((prevQuantity) => prevQuantity + itemcounter[item.counter]);

                // Show modal with the item name
                setModalMessage(`"${item.dishname}" has been added to your cart!`);
                setshowModal(true);
            }
        } catch (error) {
            console.log("Error is:", error);
            if (error.response?.data?.message === 'Token expired') {
                localStorage.clear();
                setModalErrorMessage("Session expired. Please login again.");
                seterrorModal(true);
            }
            else if (error.response.data === 'Invalid Token') {
                setModalErrorMessage("We're sorry, but something went wrong on our end.");
                seterrorModal(true);
            }
            else {
                setModalErrorMessage("Something went wrong.");
                seterrorModal(true);
            }
            setshowModal(true);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    };




    const scrollContainerRef = useRef(null);

    const [showMore, setshowMore] = useState(null);

    const GoBack = () => {
        setshowMore(null);
    }


    const showSection = (sectionn) => {
        setshowMore(sectionn);
        // console.log(showMore);
    }

    const section = menuData.find((section) => section.title === showMore);

    return (


        <div>
            {isLoading ?
                (
                    <Menuskeleton />
                ) :
                (
                    <div id="menu">
                        <Offers />

                        <div className="services pt-4 container-fluid">

                            <div className="slidebtns-container pb-3 ms-lg-5 ms-2 pt-5">
                                {menuData.map((item) => (
                                    <a key={item.id} href={`#${item.id}`} className="slidebtns">
                                        <button className="mt-3 navigatebtns border border-0 rounded py-2 px-3">
                                            {item.title}
                                        </button>
                                    </a>
                                ))}
                            </div>

                            {showMore ? (
                                <div>
                                    {
                                        section && (
                                            <div className='mt-5 pt-2'>
                                                <div key={section.title} className="mt-1 py-1" id={section.id}>
                                                    <button onClick={GoBack} className='ms-3 border border-0 bg-transparent fs-5'><IoIosArrowBack className='me-2' />Back</button>
                                                    <div className="header-container d-flex justify-content-center mt-4">
                                                        <span className="pt-1 display-5 pb-4 ps-md-3 ms-md-3 text-black poppins fw-bold">
                                                            {section.title}...
                                                        </span>
                                                    </div>

                                                    <div
                                                        className="serviceimages mt-5 pt-5 d-flex flex-wrap justify-content-center"
                                                        ref={scrollContainerRef}
                                                        data-aos="fade-up"
                                                        data-aos-easing="linear"
                                                        data-aos-duration="900"
                                                    >
                                                        {section.items.map((item) => (
                                                            <div
                                                                key={item.dishname}
                                                                className="Dynamic-container d-flex flex-column align-items-center position-relative mx-2 mb-4"
                                                            >
                                                                <img src={item.link} name="img" alt={item.dishname} className="service-img" />
                                                                <h4 className="glassmorphism px-3">
                                                                    <div className="maincontent">
                                                                        <div className="row row1">
                                                                            <span className="col-9 fs-3 pt-2 ks" name='dishname' >{item.dishname}</span>
                                                                            <span className="col-3 fs-4 pt-2 mt-1" name='price'> ₹{item.price} </span>
                                                                        </div>
                                                                        <p className="fs-6 fw-normal description mb-4">{item.description}</p>
                                                                    </div>
                                                                </h4>

                                                                <div className="footersection position-absolute bottom-0 start-0 end-0 p-3 d-flex justify-content-between">
                                                                    <span className="counter d-flex align-items-center">
                                                                        <button
                                                                            className="btn text-light border-light"
                                                                            onClick={() => {
                                                                                decrementit(item.counter);
                                                                            }}
                                                                        >
                                                                            -
                                                                        </button>
                                                                        <button className="btn text-light border-light" name="quantity" value={itemcounter}>
                                                                            {itemcounter[item.counter]}
                                                                        </button>
                                                                        <button
                                                                            className="btn text-light border-light"
                                                                            onClick={() => {
                                                                                increment(item.counter);
                                                                            }}
                                                                        >
                                                                            +
                                                                        </button>
                                                                    </span>
                                                                    <button
                                                                        className="btn text-light adc border-light"
                                                                        onClick={() => { addtocart(item) }}
                                                                    >
                                                                        Add to Cart
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            ) : (
                                <div>
                                    {menuData.map((section) => (
                                        <div key={section.title} className='mt-4 py-5' id={section.id}>
                                            <div className="header-container d-flex justify-content-between mt-4">
                                                <span className='pt-1 display-5  ps-md-3 ms-md-3 text-black poppins' align='start' data-aos="fade-right" data-aos-duration="700">{section.title}...</span>
                                                <span className='text-black fs-4 pe-3 more' onClick={() => { showSection(section.title) }}>More ▸</span>
                                            </div>

                                            <div className="serviceimages mt-5 pt-5 slider-container row flex-nowrap" ref={scrollContainerRef} data-aos="fade-up" data-aos-duration="900">
                                                <div className="">
                                                    {section.items.map((item) => (
                                                        <div key={item.dishname} className="service-container col-xl-3 col-lg-4 col-md-5 col-sm-7 col-11 position-relative">
                                                            <img src={item.link} name="img" alt={item.dishname} className='service-img' />
                                                            <h4 className='glassmorphism px-3'>
                                                                <div className="maincontent">
                                                                    <div className="row row1">
                                                                        <span className='col-9 fs-3 pt-2 ks' name="dishname">{item.dishname} </span>
                                                                        <span className='col-3 fs-4 pt-2 mt-1' name="price"> ₹{item.price} </span>
                                                                    </div>
                                                                    <p className='fs-6 fw-normal description mb-4'>{item.description}</p>
                                                                </div>
                                                            </h4>

                                                            <div className="footersection position-absolute bottom-0 start-0 end-0 p-3 d-flex justify-content-between align-items-center">
                                                                <div className="counter d-flex align-items-center">
                                                                    <button className='btn text-light border-light' onClick={() => { decrementit(item.counter) }}>-</button>
                                                                    <button className='btn text-light border-light' name="quantity" value={itemcounter}>{itemcounter[item.counter]}</button>
                                                                    <button className='btn text-light border-light' onClick={() => { increment(item.counter) }}>+</button>
                                                                </div>
                                                                <button className='btn text-light adc border-light ms-2' onClick={() => { addtocart(item) }}>Add to Cart</button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            )}

                            {
                                showModal && errorModal && (
                                    <Modal title={ModalErrorMessage} description={" Re-loading the page"} className='text-black' OnModalClose={() => { setshowModal(false) }} />
                                )
                            }


                            {showModal && modalMessage && (
                                <Modal
                                    title={modalMessage}
                                    // description={modalMessage}
                                    className="text-black"
                                    OnModalClose={() => {
                                        setshowModal(false);
                                        setModalMessage(null);
                                    }}
                                    position='bottom-right'
                                />
                            )}

                        </div>
                        <Footer className='mt-5' />
                    </div>
                )
            }
        </div >

    )
}