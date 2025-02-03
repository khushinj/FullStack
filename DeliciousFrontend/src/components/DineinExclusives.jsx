import React from 'react';
import MalaiKofta from '../images/Malai Kofta.jpeg';
import Appam from '../images/Appam.jpeg';
import DahiChaat from '../images/7 Layer Dahi Chaat.jpeg';
import ChinesePlatter from '../images/Chinese Platter.jpeg';
import PunjabiTart from '../images/Sarson da saag with Makai di tart.jpeg';
import RabriJalebi from '../images/Rabri jalebi.jpeg';
import PunjabiThali from '../images/Punjabi Main Course.jpeg';
import RavaKesari from '../images/Rava Kesari.jpeg';
import KothimbirVadi from '../images/Kothimbir Vadi.jpeg';
import DalDokli from '../images/Dal Dhokli.jpeg';
import AppleKheer from '../images/Apple Kheer.jpeg';
import PuranPoli from '../images/Puran Poli.jpeg';

export default function DineinExclusives() {

    const section = [
        {
            title: 'Desserts',
            id: 'desserts',
            items: [
                { img: PuranPoli, dishname: "Puran Poli", description: "A sweet, stuffed flatbread made with a filling of jaggery and yellow lentils, flavored with cardamom and saffron, offering a deliciously rich treat.", price: "$5.99" },
                { img: MalaiKofta, dishname: "Malai Kofta", description: "A rich and creamy North Indian dish with soft paneer and potato dumplings in a spiced tomato gravy", price: "$5.99" },
                { img: Appam, dishname: "Appam", description: "A soft, fluffy South Indian rice pancake with crispy edges, best enjoyed with stew or curry.", price: "$6.99" },
                { img: DahiChaat, dishname: "7 Layer Dahi Chaat", description: " A tangy, layered chaat with papdi, potatoes, yogurt, chutneys, sev, and pomegranate for the perfect crunch and burst of flavors.", price: "$7.49" },
                { img: ChinesePlatter, dishname: "The Royal Chinese platter", description: " A flavorful assortment of classic Chinese delights like spring rolls, crispy noodles, chili paneer, and fried rice, perfect for a shared indulgence.", price: "$4.99" },
                { img: KothimbirVadi, dishname: "Kothimbir Vadi", description: "A savory, crispy steamed snack made from a flavorful mix of fresh coriander, chickpea flour, and spices, typically served with chutney.", price: "$3.99" },
                { img: PunjabiTart, dishname: "Sarson da saag with Makai di tart", description: "A classic Punjabi dish of spiced mustard greens paired with a crispy cornmeal tart.", price: "$5.49" },
                { img: RavaKesari, dishname: "Kesari Rava", description: "A rich and aromatic South Indian semolina dessert, flavored with saffron, cardamom, and garnished with nuts and dry fruits for a perfect sweet indulgence.", price: "$4.99" },
                { img: RabriJalebi, dishname: "Rabri jalebi", description: "A decadent combination of warm, crispy jalebis served with rich, creamy rabri for a perfect sweet indulgence.", price: "$6.49" },
                { img: DalDokli, dishname: "Dal Dhokli", description: "A comforting Gujarati dish of soft wheat flour dumplings simmered in spiced, tangy lentil stew, served as a hearty and flavorful meal", price: "$6.99" },
                { img: PunjabiThali, dishname: "Punjabi Main Course", description: "A vibrant assorPunjabiThalient of Punjabi favorites like Dal Makhani, Chole Bhature, Aloo Paratha, and Paneer Tikka offering a true taste of Punjab", price: "$7.99" },
                { img: AppleKheer, dishname: "Apple Kheer", description: "A creamy, aromatic dessert made with grated apples, milk, and cardamom, offering a delightful twist to the traditional kheer.", price: "$3.99" },
            ]
        },
    ];

    return (
        <div>
            <h1 align='center' className='text-black my-5 poppins'>Our dine-in Exclusives</h1>

            <div className="serviceimages mt-5 pt-5 slider-container row flex-nowrap mb-5" data-aos="fade-up" data-aos-easing="linear" data-aos-duration="500">

                <div className="">


                    {/* Loop through the sections */}
                    {section.map((sectionItem, index) => (
                        <div key={index}>
                            <div className="pt-3 mb-5">
                                {sectionItem.items.map((item, index) => (
                                    <div key={index} className="exclusive-container col-xl-3 col-lg-4 col-md-5 col-sm-7 col-11 position-relative">
                                        <img src={item.img} alt={item.dishname} className="service-img" />
                                        <h4 className="glassmorphism px-3">
                                            <div className="maincontent">
                                                <div className="pt-4">
                                                    <span className="col-9 fs-3 ks">{item.dishname}</span>
                                                </div>
                                                <p className="fs-6 fw-normal pt-3 mb-5">{item.description}</p>
                                            </div>
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
