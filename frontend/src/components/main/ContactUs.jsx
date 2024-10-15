import React, { useEffect } from "react";

function ContactUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
    })
    return (
        <div>
            <h1>Contact Us</h1>
            <p>
                Contact Us: 010-1234-5678
                <br />
                E-mail: whshin04@naver.com
                <br />
                Address: Seoul, Korea
            </p>
        </div>
    );
}

export default ContactUs;