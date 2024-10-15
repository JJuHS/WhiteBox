import React, { useEffect, useState } from "react";
import "../../styles/information/infoSite.css";
import { Tooltip, TooltipProvider } from "react-tooltip";
import axios from "axios";

function SiteCard({ site }) {
    const [thumbnail, setThumbnail] = useState(null);
    
    // url에 따른 썸네일 가져오기
    useEffect(() => {
        axios
            .get(`https://api.microlink.io/?url=${site.url}`)
            .then((res) => {
                setThumbnail(res.data.data.image.url);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [site.url]);

    return (
        <div className="site-card relative flex flex-col justify-between h-full">
            <div className="grid grid-cols-2 p-4 flex-grow">
                <div>
                    {thumbnail && (
                        <img src={thumbnail} alt="" className="h-16 w-auto"/>
                    )}
                </div>
                <div className="flex justify-end items-center">
                    <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="site-card-link font-semibold rounded"
                        data-tooltip-id={site.name}
                        data-tooltip-content={site.name}
                    >
                        사이트 방문하기 🔗
                    </a>
                </div>
            </div>

            <div className="text-center mb-4"> 
                <h2 className="site-card-title text-xl font-semibold mb-2"> &lt; {site.name} &gt; </h2>
                <Tooltip className="site-tooltip" id={site.name} place="top" effect="solid" />
            </div>
        </div>
    );
}

export default SiteCard;
