import React from 'react';
import FeedbackForm from './Feedback';

export default function Footer() {


    return (
        <div className='border-top'>

            <footer class="text-dark py-4">
                <div class="container">
                    <div class="row">

                        <div class="col-md-3 mb-4">
                            <h5 class="text-success">About Delicious App</h5>
                            <p>
                                Connecting food lovers with delicious recipes and unforgettable dining experiences worldwide. Discover curated menus, unique dining options, and seasonal specials.
                            </p>
                        </div>

                        <div class="col-md-3 mb-4">
                            <h5 class="text-success">Quick Links</h5>
                            <ul class="list-unstyled">
                                <li><a href="/" class="text-dark">Home</a></li>
                                <li><a href="/menu" class="text-dark">Menu</a></li>
                                {/* <li><a href="/order-online" class="text-dark">Order Online</a></li> */}
                                <li><a href="/dine-in" class="text-dark">Reservations</a></li>
                                <li><a href="/#specials" class="text-dark">Specials</a></li>
                                <li><a href="/contactus" class="text-dark">Contact Us</a></li>
                            </ul>
                        </div>

                        <div class="col-md-3 mb-4">
                            <h5 class="text-success">Contact Us</h5>
                            <p><strong>Phone:</strong> 8724179XXX</p>
                            <p><strong>Email:</strong> support@deliciousapp.com</p>
                            <p><strong>Address:</strong> 123 Food Street, Flavor Town</p>
                            {/* <a href="https://maps.google.com" target="_blank" class="text-success">View on Map</a> */}
                        </div>

                        <div class="col-md-3 mb-4">
                            <h5 class="text-success">Feedback & Reviews</h5>
                            <p>We value your feedback! Let us know how we’re doing, and leave a review to help others find us.</p>
                            <a href="/feedbackform" class="btn btn-outline-success"  >Leave Feedback</a>
                        </div>
                    </div>

                    <div class="text-center mt-4 pt-3 border-top">
                        <p>&copy; 2024 Delicious App. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
