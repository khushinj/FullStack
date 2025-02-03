// scrollAnimations.js
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
    gsap.from('.fade-up', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: '.fade-up',
            start: 'top 80%',
            end: 'bottom top',
            scrub: true,
            markers: true,
        }
    });
};
