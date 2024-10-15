import React, { useEffect, useState } from 'react';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 200) { 
        setIsVisible(true);
        } else {
        setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility); 
        return () => {
        window.removeEventListener('scroll', toggleVisibility); 
        };
    }, []);

    return (
        isVisible && (
        <button
            onClick={scrollToTop}
            className="fixed bottom-20 right-10 rounded-full shadow-lg border w-8 h-8 flex flex-col items-center justify-center"
        >
            <span style={{ fontSize: '0.8rem', lineHeight: '1rem' }}>TOP</span>
        </button>
        )
    );
};

export default ScrollToTop;
