import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Animation = ({ size }) => {
  return (
    <DotLottieReact
      src="https://lottie.host/2ae2026e-991c-4647-8e9c-84e81ae2573d/ZL7uoqekfF.lottie"
      loop
      autoplay
      className='border border-white'
      size={size}
    />
  );
};
