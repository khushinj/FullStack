import React from 'react';
import Dineinvid from '../videos/Dineinvid.mp4';
import DiningOptions from './DiningOptions';
import { useNavigate } from 'react-router-dom';
import DineinExclusives from './DineinExclusives';
import Footer from './Footer';




export default function Dinein() {


    const navigateto = useNavigate();



    const goToReservation = () => {
        navigateto('/dine-in/reservationform');
    }
    return (
        <div className='container-fluid '>
            <div className="row mb-5">
                <div className="DineinHeroimg col-12">
                    <video autoPlay loop muted className='DineinHerovid' >
                        <source src={Dineinvid} type='video/mp4' className='DineinHerovid' />
                    </video>
                    <div className='glass-content mt-4'>
                        <h1 className='display-1 fw-normal poppins'>Experience Fine Dining at <p className='ks display-md-7'>Delicious</p></h1>
                        <button className='rounded-2 p-2 fs-5 mt-4 reservation border text-white' onClick={goToReservation} >Reserve your Table </button>
                    </div>
                </div>
            </div>


            <DiningOptions />



            <DineinExclusives />

            <Footer />

        </div>
    )
}