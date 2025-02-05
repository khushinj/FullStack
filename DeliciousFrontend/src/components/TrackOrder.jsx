import React, { useState, useEffect } from 'react';
import { Animation } from '../videos/Animation';
import { FoodPreparation } from '../videos/FoodPreparation';
import { OrderPacked } from '../videos/OrderPacked';
import { Delivered } from '../videos/Delivered';

export default function TrackOrder() {
    const OrderInfo = [
        { animation: <FoodPreparation size={100} />, text: "Your order is being prepared!!", time: "Estimated: 10 min" },
        { animation: <OrderPacked size={100} />, text: "Your order is shipped and ready to deliver", time: "Estimated: 15 min" },
        { animation: <Animation size={100} />, text: "Your delivery expert is on the way", time: "Estimated: 20 min" },
        { animation: <Delivered size={100} />, text: "Your food has been delivered. Enjoy your meal", time: "Delivered" }
    ];

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentStep((prevStep) => (prevStep + 1) % OrderInfo.length);
        }, 29000);

        return () => clearTimeout(timer);
    }, [currentStep]);

    return (
        <div className="text-black container-fluid">
            <div className="row justify-content-center text-center">
                <div className="col-lg-7 col-md-9 col-12">
                    <h2 className="pt-5 mt-5">{OrderInfo[currentStep].text}</h2>
                    <p className="text-muted pt-3">{OrderInfo[currentStep].time}</p>
                    <div className="trackingorder mt-md-0 mt-5">
                        {OrderInfo[currentStep].animation}
                    </div>
                </div>
            </div>
        </div>
    );
}
