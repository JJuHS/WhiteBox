import React, { useState } from "react";
import InformationAfterAccident from "./InformationAfterAccident";
import InformationMain from "./InformationMain";
import InformationSite from "./InformationSite";
import InformationTerm from "./InformationTerm";
import InformationUpdatedLaw from "./InformationUpdatedLaw";


function InformationDetail() {
    const location = window.location.pathname; // 현재 url
    let type;

    // url에 따라서 type 정의
    if (location) {
        if (location.includes('/law-updated')) {
            type = 'updatedLaw';
        } else if (location.includes('/law-executed')) {
            type = 'executedLaw';
        } else if (location.includes('/law-term')) {
            type = 'term';
        } else if (location.includes('/after-accident')) {
            type = 'afterAccident'; 
        } else if (location.includes('/site-map')) {
            type = 'siteMap';
        } else {
            type = 'main';
        }
    }
    
    // type에 따라서 p페이지 렌더링
    const renderPage = () => {
        switch (type) {
            case 'updatedLaw':
                return <InformationUpdatedLaw/>;
            case 'term':
                return <InformationTerm />
            case 'afterAccident':
                return <InformationAfterAccident />
            case 'siteMap':
                return <InformationSite />
            default:
                return <InformationMain />;
        }
    }

    return (
        <div>
            {renderPage()}
        </div>
    );
}

export default InformationDetail;