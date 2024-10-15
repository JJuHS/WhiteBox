import React, { useState } from "react";
import UpdatedLawCard from "./UpdatedLawCard";
import { useLocation } from "react-router-dom";

function InformationUpdatedLaw() {
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    let lawName = params.get('law') || '';
    let pageId = parseInt(params.get('page'), 10) || 1;

    if (lawName.includes('본문')) {
        lawName = "도로교통법"
    }
    if (lawName.includes('개정')) {
        lawName = "도로교통법"
    }
    return(
        <div>
            <p className="text-center font-semibold mt-3">개정법령정보</p>
            <p className="text-center mt-2">{ lawName }</p>
            {UpdatedLawCard({ law: lawName, id: pageId})}
        </div>
    )
}

export default InformationUpdatedLaw;