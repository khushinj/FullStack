import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const FoodPreparation = ({ size }) => {
    return (
        <DotLottieReact
            src="https://lottie.host/bcfa3ba6-17df-48d2-99d5-ad82736659ee/HuMpKnlzey.lottie"
            loop
            autoplay
            style={{ width: size, height: size }}
            className=' foodpreparation'
        />
    );
};
