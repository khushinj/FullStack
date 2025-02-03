import React, { useState } from "react";
import axios from "axios";
import cust1 from '../images/CustomerImages/Customer1.jpg';
import cust2 from '../images/CustomerImages/Cust2.jpg';
import cust3 from '../images/CustomerImages/Cust3.jpg';
import cust4 from '../images/CustomerImages/Cust4.jpg';
import cust5 from '../images/CustomerImages/Cust5.jpg';

export default function Feedback() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [label, setLabel] = useState();
    const [feedback, setFeedback] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [name, setName] = useState();
    const [selectedImageIndex, setSelectedImageIndex] = useState(1); // Default to Image 1

    const moods = [
        { id: 1, label: "Bad", emoji: "😟" },
        { id: 2, label: "Decent", emoji: "😐" },
        { id: 3, label: "Love it!", emoji: "😍" },
    ];

    const customerImages = [cust1, cust2, cust3, cust4, cust5];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_DELICIOUS_BACKEND_URL}/feedback`,
                { feedback, label, name, image: selectedImageIndex }
            );
            // console.log("Response:", response.data);
        } catch (error) {
            console.log("ERR:", error);
        }
        setIsSubmitted(true);
    };

    return (
        <div>
            <div className="container-fluid text-black mt-5 pt-5">
                <div className="row justify-content-center">
                    <div className="col-sm-10 col-11 col-md-8 col-lg-5 border rounded-4 text-center p-4 shadow-sm">
                        {isSubmitted ? (
                            <div className="alert alert-success">
                                <h5>Thank you for your feedback!</h5>
                                <p>We appreciate your input and will use it to improve our service.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} method="post">
                                <h1 className="fs-3 mb-4">How was your experience?</h1>
                                <p>Your input is valuable in helping us better understand your needs and tailor our service accordingly.</p>

                                <div className="d-flex justify-content-start mb-4">
                                    <input
                                        type="text"
                                        name="uname"
                                        placeholder="Enter your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="col-12 py-2 px-2 rounded-3 border"
                                    />
                                </div>

                                {/* Image Selection */}
                                <div>
                                    <h5>Select an image to display:</h5>
                                    <div className="d-flex flex-wrap justify-content-center gap-2">
                                        {customerImages.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image}
                                                alt={`Customer ${index + 1}`}
                                                className={`rounded-circle border ${selectedImageIndex === index + 1 ? "border-success border-3" : "border-secondary"
                                                    }`}
                                                style={{
                                                    width: "60px",
                                                    height: "60px",
                                                    cursor: "pointer",
                                                    objectFit: "cover",
                                                }}
                                                onClick={() => setSelectedImageIndex(index + 1)}
                                            />
                                        ))}
                                    </div>
                                    {/* <p className="mt-2">Selected Image: {selectedImageIndex}</p> */}
                                </div>

                                {/* Mood Selection */}
                                <div className="d-flex justify-content-center mt-4">
                                    {moods.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`px-3 py-2 border mx-2 moodfeedback rounded-4 ${selectedMood === item.id ? "text-black border mood-option border-success" : "text-black"
                                                }`}
                                            onClick={() => {
                                                setSelectedMood(item.id);
                                                setLabel(item.label);
                                            }}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <p className="m-0 fs-5">
                                                {item.emoji} <span>{item.label}</span>
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {selectedMood && (
                                    <div className="mt-3">
                                        <h5>You selected: {moods.find((mood) => mood.id === selectedMood)?.label}</h5>
                                    </div>
                                )}

                                {/* Feedback Input */}
                                <textarea
                                    name="feedback"
                                    className="col-12 feedbackarea rounded-3 form-control mt-4"
                                    rows={4}
                                    required
                                    placeholder="Feel free to provide additional feedback..."
                                    onChange={(e) => setFeedback(e.target.value)}
                                ></textarea>

                                <button type="submit" className="col-12 py-2 mt-4 bg-dark text-white border rounded-2" style={{ cursor: "pointer" }}>
                                    Submit your Feedback
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
