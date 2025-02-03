import React from 'react';
import O1 from '../videos/Outdoor1.mp4';
import Cf1 from '../videos/ChefTable1.mp4';
import CandleLit from '../videos/CandleLit1.mp4';
import PrivateDining from '../videos/PrivateDining1.mp4';
import Vip from '../videos/VIPLounge.mp4';
import rooftop from '../videos/rooftop.mp4';

export default function DiningOptions() {


    const DiningType = [
        {
            vid: rooftop, title: 'Rooftop Dining', description: 'Elevate your dining experience with breathtaking views and a serene atmosphere under the stars. Perfect for romantic evenings or special celebrations.'
        },
        {
            vid: O1, title: 'Outdoor Dining', description: 'Unwind in a tranquil outdoor setting, surrounded by nature, as you enjoy your meal in the refreshing open air.'
        },
        {
            vid: Cf1, title: "Chef's Table", description: 'Enjoy an exclusive, front-row seat to culinary artistry, where the chef prepares your meal right before your eyes for a truly unforgettable experience.'
        },
        {
            vid: CandleLit, title: "CandleLit Dinner", description: 'Indulge in a romantic, candlelit evening with soft ambiance and a cozy, intimate atmosphere perfect for two.'
        },
        {
            vid: PrivateDining, title: 'Private Dining', description: 'Escape to your own private oasis, ideal for intimate gatherings or business meetings in a secluded, luxurious setting.'
        },
        {
            vid: Vip, title: 'VIP Lounge (Celebration)', description: 'Celebrate in style with an exclusive VIP experience, offering luxurious surroundings and top-notch service for your special occasion'
        }
    ]


    return (
        <div className='container-fluid'>
            <div className="DiningOptions mt-5 row mx-xl-5  justify-content-around"  data-aos="fade-up">
                <h1 align='center' className='text-black poppins my-5'>Types Of Dining Experience We Offer</h1>
                {DiningType.map((item, index) => (
                    <div key={index} className="dinein-card p-0 col-xl-5 col-lg-5 col-sm-9 col-11 mx-xl-5 text-black my-lg-5 my-3">
                        <video autoPlay muted loop >
                            <source src={item.vid} />
                        </video>
                        <div className="dinein-card-body">
                            <h5 className="card-title fs-2 pb-3 ks">{item.title} <span>→</span></h5>
                            <p className="card-text poppins fw-semibold">{item.description}</p>
                        </div>
                    </div>
                ))}

            </div>


        </div>
    )
}
