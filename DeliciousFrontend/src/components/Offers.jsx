import React, { useState } from "react";
import Slider from "react-slick";
import Offer1 from "../images/Offer1 copy 2.jpg";
import Offer3 from "../images/Offer2.jpg";
import Offer2 from "../images/Offer3 (1).jpg";
import Offer4 from '../images/Offer4.jpg';
import Offer5 from '../images/Offer5.jpg';
import Offer6 from '../images/Offer6.jpg';
import Modal from "./Modal";
import axios from 'axios';

export default function PhotoSlider() {
    const images = [Offer1, Offer3, Offer2, Offer4, Offer5, Offer6];
    const [ModalMessage, setModalMessage] = useState();
    const [showModal, setshowModal] = useState(false);
    const [discountedPrice, setdiscountedPrice] = useState(0);
    const [offerState, setofferState] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState();


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        responsive: [
            {
                breakpoint: 768, // For tablets and smaller devices
                settings: {
                    dots: true,
                    arrows: false, // Hide arrows for smaller screens
                },
            },
        ],
    };

    const token = localStorage.getItem('token');


    const handleOffer = async (index) => {
        try {
            const UpdatePrice = async (index) => {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/cartitems/update-offerNum`, { offerNum1: index }, { headers: { Authorization: `Bearer ${token}` } });
                    // console.log("Update price response:", response);
                }
                catch (err) {
                    console.log("Error while updating price:", err);

                }
            }

            const Fetchedresponse = await axios.get(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/cartitems`, { headers: { Authorization: `Bearer ${token}` } });
            // console.log(Fetchedresponse);

            if (Fetchedresponse.data.isOfferApplied === false) {
                const UpdateData = await axios.post(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/cartitems/update-offer`, { isOfferApplied: true }, { headers: { Authorization: `Bearer ${token}` } });
                // console.log(UpdateData.data);
                setModalMessage("Offer Applied!");
                setshowModal(true);
                UpdatePrice(index);
            }
            else {
                // console.log("Only one offer can be applied at a time!");
                setshowModal(true);
                setofferState(true);
            }
        }
        catch (err) {
            console.log("Error while applying offer:", err);
            localStorage.clear();
            setshowModal(true);
            setErrorMessage(err.response.data.message);
        }



        setModalMessage(" Your special offer is applied. Get ready to enjoy delicious food for less!");
        setshowModal(true);

    }

    return (
        <div className="container-fluid mt-5 px-lg-5 pt-5 services ">
            <Slider {...settings} className=" rounded-5" >
                {images.map((image, index) => (
                    <div key={index} onClick={() => { handleOffer(index) }}>
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="img-fluid w-100 rounded-5 offerimg"
                            style={{ objectFit: "cover", maxHeight: "500px" }}
                        />
                    </div>
                ))}
            </Slider>

            {ModalMessage && showModal && !offerState && !ErrorMessage && (
                <Modal
                    title={"Offer Applied!"}
                    description={ModalMessage}
                    OnModalClose={() => { setshowModal(false) }}
                />
            )}

            {showModal && offerState && (
                <Modal
                    title={"Not applicable"}
                    description={"Only one offer can be applied at a time!"}
                    OnModalClose={() => { setshowModal(false) }}
                />
            )}

            {showModal && ErrorMessage && (
                <Modal
                    title={"Please login again"}
                    description={ErrorMessage}
                    OnModalClose={() => { setshowModal(false) }}
                />
            )}


        </div>
    );
}
