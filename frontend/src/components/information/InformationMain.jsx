import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/information/main.css'
function InformationMain() {
    const navigate = useNavigate();
    const handleGoToPage = (toGo) => {
        navigate(toGo);
        window.scroll(0, 0);
    }

    return (
        <div className="mt-5 ml-5">
            <h2 className="text-center mt-5 mb-3 font-bold text-2xl truncate">정보게시판</h2>
            <br />
            <p className="text-center text-lg mb-4 ml-3 truncate-text">정보게시판에 오신 것을 환영합니다.</p>
            <div className="ml-7 p-3 w-full">
                <div className="mb-2 mt-3 flex justify-between"><span className="truncate-text">개정된 법령 정보를 제공합니다.</span><span className="cursor-pointer text-blue-300 hover:text-blue-600 truncate" onClick={() => handleGoToPage('law-updated')}>바로가기</span></div><hr />
                <div className="mb-2 mt-3 flex justify-between"><span className="truncate-text">과실상계 및 절차, 인정기준에 대한 정보를 제공합니다.</span><span className="cursor-pointer text-blue-300 hover:text-blue-600 truncate" onClick={() => handleGoToPage('after-accident')}>바로가기</span></div><hr />
                <div className="mb-2 mt-3 flex justify-between"><span className="truncate-text">교통사고 관련 용어 정리를 제공합니다.</span><span className="cursor-pointer text-blue-300 hover:text-blue-600 truncate" onClick={() => handleGoToPage('law-term')}>바로가기</span></div><hr />
                <div className="mb-2 mt-3 flex justify-between"><span className="truncate-text">관련 사이트 정보를 제공합니다.</span><span className="cursor-pointer text-blue-300 hover:text-blue-600 truncate" onClick={() => handleGoToPage('site-map')}>바로가기</span></div><hr />
            </div>
        </div>
    );
}

export default InformationMain;
