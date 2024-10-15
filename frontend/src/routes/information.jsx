import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// 컴포넌트 로드
import InformationDetail from "../components/information/InformationDetail";
import InformationMain from "../components/information/InformationMain";
// 사이드바 로드
import InfoSideBar from "../components/information/InfoSideBar";
import InformationUpdatedLaw from "../components/information/InformationUpdatedLaw";
import { Helmet } from 'react-helmet';

const InformationRoutes = () => {
    const [isOpen, setIsOpen] = useState(true);
    const sidebarWidth = isOpen ? 'w-[200px]' : 'w-[90px]';

    return (
        <div className="grid grid-cols-12 overflow-hidden mt-3">
            <Helmet>
                <title>White Box | 정보게시판</title>
            </Helmet>
            <div className="col-span-1"></div>
            <div className="col-span-10 flex h-full">
                {/* 사이드바 */}
                <div className={`${sidebarWidth} transition-width`}>
                    <InfoSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>

                {/* 메인 컨텐츠 */}
                <div className="flex-1 overflow-y-auto p-4">
                    <Routes>
                        <Route path="/*" element={<InformationMain />} />
                        <Route path="/law-executed/*" element={<InformationDetail />} />
                        <Route path="/law-updated/*" element={<InformationUpdatedLaw />} />
                        <Route path="/law-term/*" element={<InformationDetail />} />
                        <Route path="/site-map/*" element={<InformationDetail />} />
                        <Route path="/after-accident/*" element={<InformationDetail />} />
                    </Routes>
                </div>
            </div>
            <div className="col-span-1"></div>
        </div>
    );
};

export default InformationRoutes;
