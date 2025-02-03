import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function Menuskeleton() {

    const section = new Array(10).fill(null);
    return (
        <div>
            <Skeleton height={400} width="100%" />
            <span className='d-flex gap-3'>
                <Skeleton height={40} width='5rem' className='ms-5 mt-5' />
                <Skeleton height={40} width='5rem' className='ms-5 mt-5' />
                <Skeleton height={40} width='5rem' className='ms-5 mt-5' />
                <Skeleton height={40} width='5rem' className='ms-5 mt-5' />
                <Skeleton height={40} width='5rem' className='ms-5 mt-5' />

            </span>

            <div className='mt-5 pt-3'>
                <div className="d-flex justify-content-between">
                    <Skeleton width={280} height={50} className='mx-5 mt-5' />
                    <Skeleton width={120} height={50} className='mx-5 mt-5' />

                </div>


                <div className="serviceimages mt-5 pt-5 slider-container row flex-nowrap">
                    <div className="">
                        {section.map((index, item) => (
                            <div key={index} className="service-container col-xl-3 col-lg-4 col-md-6 col-sm-8 col-11">
                                <Skeleton className='service-img' />
                                <h4 className='glassmorphism px-3'>
                                    <div className="maincontent">
                                        <div className="row row1">
                                            <span className='col-9 fs-3 pt-2 ks'>
                                                <Skeleton width={200} />
                                            </span>
                                            <span className='fw-light col-3 fs-4 pt-2 mt-1'>
                                                <Skeleton width={50} />
                                            </span>
                                        </div>
                                        <p className='fs-6 fw-lighter description'>
                                            <Skeleton count={2} />
                                        </p>
                                        <div className="row footersection">
                                            <span className='d-flex justify-content-between counter '>
                                                <Skeleton height={40} width={120} />
                                                <Skeleton height={40} width={120} />
                                            </span>
                                        </div>
                                    </div>
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}
