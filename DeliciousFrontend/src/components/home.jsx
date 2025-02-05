import React from 'react';
import img1 from '../images/menubg.png';
import '../App.css';

import pastry from '../images/pastry.jpg';
import mangoshake from '../images/mango shake.png';
// import mangoshake from './example.png';
import pancake from '../images/honey pancake.jpg';
import CustFeedback from './Cust_Feedback';
import Footer from './Footer';
// import Testing from './Testing.jsx';
// import Cookingvid1 from '../videos/cookvid3.mp4';
// import { countercontext } from './App';

export default function Home() {
    // const [counter] = useContext(countercontext);

    const specials = [{ img: pastry, dishname: "Raspberry pastry", description: "Layered raspberry cake featuring a perfect balance of moist sponge and tangy raspberry preserves" },
    { img: pancake, dishname: "Honey Pancakes", description: "Fluffy pancakes drizzled with golden honey, topped with fresh banana slices and mint leaves" },
    { img: mangoshake, dishname: "Mango Smoothie", description: "Creamy mango smoothie featuring ripe mangoes, yogurt, and a hint of citrus making it more delicious" }
    ]

    return (
        <div className="main">
            <img src={img1} alt="img" className='bgimg' />
            <div className="overlay-container" >
                <h1 className='overlay-text hero-section-heading ks' align='center'  >Delicious</h1>
                <h4 className='overlay-textsub pt-lg-2 pt-md-4 pt-0 col-10 col-sm-10 col-lg-7 col-xl-6 text-center fw-light text-black poppins' >Experience a fusion of authentic Indian flavors and global delights, crafted to satisfy every craving.</h4>
                {/* <div className='overlay-textsub mt-5 pt-3'>
                    <button className='mt-5 mx-4 py-2 px-4 rounded-3  booktable text-white '>Book a Table</button>
                    <button className='mx-4 py-2 px-3 rounded-3 btn  border-dark '>Explore Menu</button>
                </div> */}
            </div>
            {/* <Testing /> */}

            <div className="services py-4 pb-5 container-fluid" id='specials'>
                <h1 className='pt-5 display-5 pb-4 text-black poppins ' align='center'>Our Specials</h1>
                <div className="row serviceimages mt-5 pt-5 " align='center'>

                    <div className='justify-content-lg-around d-lg-flex d-block'>
                        {specials.map((item, index) => {
                            return (
                                <div key={index} className="service-container homeimg col-xl-3  col-md-8 col-sm-8 mx-xl-5 mx-0 mb-lg-0 mb-5 text-start" data-aos="zoom-in">
                                    <img src={item.img} alt="" className='service-img shadow-lg' />
                                    <h4 className='glassmorphism px-3 ' >
                                        <div className="row row-home  mt-xl-5 mt-lg-4 mt-4">
                                            <span className='col-9 ks fs-3 pt-2'>{item.dishname} </span>
                                            <span className='col-3 fw-light col-3 fs-4 pt-2 mt-1'>$5.99</span>
                                        </div>
                                        <p className='fs-6 fw-normal description-home'>{item.description}</p>
                                    </h4>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <CustFeedback />
            {/* <div className="feedback pt-4 py-5">
                <h1 className='pt-5 display-5 pb-4' align='center'>Customer Feedback</h1>
                <div className="">
                    <div className="cards mt-5 pt-5 d-md-flex d-block pb-5 row mx-auto">
                        <div className="col-xl-3 col-md-4 col-sm-7 col-10 mx-auto py-5">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-text fs-2 ps-2">“The food was super delicious”</h5>
                                    <p className="footer fs-4 martha pe-3" align='end'>-Martha</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-4 col-sm-7 col-10 mx-auto py-5">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-text fs-2 ps-2">“Couldn’t stop myself from eating more and more ✨❤️”</h5>
                                    <p className="footer fs-4 pe-3" align='end'>-Linda</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-4 col-sm-7 col-10 mx-auto py-5">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-text fs-2 ps-2">“Best restaurant!! As the name says, food was delicious too”</h5>
                                    <p className="footer fs-4 pe-3" align='end'>-Marcus</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <Footer />
        </div>
    );
}
