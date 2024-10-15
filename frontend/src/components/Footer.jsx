import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {
    const navigate = useNavigate();
    return (
        <footer className="block relative bottom-0 w-[100%] p-4 text-white text-center bg-[#458EF7]">
        <p>
            White Box | <span className="cursor-pointer" onClick={() => {navigate(`/privacy-policy`)}}>개인정보처리방침</span> | <span onClick={() => navigate(`/terms-and-conditions`)} className="cursor-pointer">이용약관</span> | <span onClick={() => navigate(`/contact-us`)} className="cursor-pointer">Contact Us</span>
        </p>
        </footer>
    );
}

export default Footer;
