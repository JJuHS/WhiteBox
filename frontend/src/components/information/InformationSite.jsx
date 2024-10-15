import React, { useEffect, useState } from "react";
import SiteCard from './SiteCard';
import useInformationStore from "../../store/useInformationStore";

function InformationSite() {
    const [siteList, setSiteList] = useState([]);
    const getSiteList = useInformationStore((state) => state.getSiteList)

    useEffect(() => {
        const loadSiteList = async () => {
            const response = await getSiteList();
            setSiteList(response);
        }
        loadSiteList();
    }, []);

    return(
        <div className="flex flex-col mt-5">
            <div className="text-center font-semibold text-2xl mb-3">
                더 많은 사이트에서 원하는 정보를 찾아보세요
            </div>
            <div className="grid grid-cols-2 gap-4">
                {siteList.map((site, index) => (
                    <SiteCard key={index} site={site}/>
                ))}
            </div>
        </div>
    )
}

export default InformationSite;