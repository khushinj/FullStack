import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import customer images
import Customer1 from '../images/CustomerImages/Customer1.jpg';
import Customer2 from '../images/CustomerImages/Cust2.jpg';
import Customer3 from '../images/CustomerImages/Cust3.jpg';
import Customer4 from '../images/CustomerImages/Cust4.jpg';
import Customer5 from '../images/CustomerImages/Cust5.jpg';
import userIcon from '../images/Ellipse 4.png';

export default function CustFeedback() {
    const [Data, setData] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        const handleFeedback = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/Fetchfeedback`);
                setData(res.data.data);
                console.log(res.data.data);
            } catch (error) {
                console.log("error:", error);
            }
        };

        handleFeedback();
    }, []);

    // Function to get the correct image based on item.image value
    const getImage = (imageIndex) => {
        switch (imageIndex) {
            case 1:
                return Customer1;
            case 2:
                return Customer2;
            case 3:
                return Customer3;
            case 4:
                return Customer4;
            case 5:
                return Customer5;
            default:
                return userIcon;
        }
    };

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <div className='main'>
            <div className="feedback pt-4 py-5">
                <h1 className='pt-5 display-5 pb-4 poppins' align='center'>Customer Feedback</h1>
                <div className="">
                    <div className="pt-5 row mx-auto">
                        <div className="feedback-cards-container d-flex overflow-auto pb-5">
                            {Data.map((item, index) => (
                                <div key={index} className="col-xl-3 cards col-md-4 col-sm-7 col-10 mx-auto py-5" data-aos="flip-up">
                                    <div className="card">
                                        <div className="header ms-3 mt-2 ps-2 d-flex mt-2">
                                            <div className='col-2 me-3'>
                                                {/* Corrected image source */}
                                                <img src={getImage(item.image)} height={50} width={50} className="personimmg rounded-circle border" alt={item.name} />
                                            </div>
                                            <div>
                                                <p className='pt-1 personName fs-4'>{item.name}</p>
                                            </div>
                                        </div>

                                        <div className="card-body mb-4 rounded-3">
                                            <div className='mx-3 maintext rounded-3'>
                                                <h5 className={`card-text fs-6 px-3 py-3 ${expandedIndex === index ? 'expanded' : 'clamped'}`}>
                                                    <p>Experience: {item.label}</p>
                                                    {item.feedback}
                                                </h5>
                                                {item.feedback.length > 100 && (
                                                    <button
                                                        className="btn btn-link"
                                                        onClick={() => handleToggle(index)}>
                                                        {expandedIndex === index ? "Show Less" : "Show More"}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
