// Scroll.js
import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

const Scroll = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      // Add other options here if needed
    });

    // Clean up
    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default Scroll;
