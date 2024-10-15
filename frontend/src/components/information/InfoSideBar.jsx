import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/information/InfoSideBar.css";
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

function InfoSideBar({ isOpen, setIsOpen }) {
    const navigate = useNavigate();

    // 사이드바 항목들
    const contents = {
        0: { name: '개정법령정보', parent: null, url:"law-updated" },
        1: { name: '과실상계 및 절차', parent: null, url:"after-accident", index:0  },
        2: { name: '용어 정리', parent: null, url:"law-term" },
        3: { name: '관련사이트', parent: null, url:"site-map" },
        4: { name: '도로교통법', parent: 0, url:"law-updated" },
        5: { name: '교통사고처리 특례법', parent: 0, url:"law-updated" },
        6: { name: '특정범죄 가중처벌법', parent: 0, url:"law-updated" },
        7: { name: '과실상계란?', parent: 1, url:"after-accident", index:0 },
        8: { name: '과실상계절차', parent: 1, url:"after-accident", index:1 },
        9: { name: '과실비율 인정기준', parent: 1, url:"after-accident", index:2 },
        10: { name: '도로교통법 본문', parent: 4, url:"law-updated" },
        11: { name: '도로교통법 시행규칙', parent: 4, url:"law-updated" },
        12: { name: '도로교통법 시행령', parent: 4, url:"law-updated" },
    };

    // 들여쓰기에 따른 색상
    const colorStyle = {
        0:'#000000',
        1:'#444444',
        2:'#888888',
        3:'#CCCCCC',
    };

    // 페이지 이동함수
    const handlePageClick = (content) => {
        if (content === 'main') {
            navigate(`information/main`)
            return;
        }
        const url = content.url
        const name = content.name
        if (url === undefined ) {
            navigate(`/information`);
        } else if (url.includes('after-accident')) {
            navigate(`/information/${url}`, { state: { index:content.index } });
        } else if (url.includes('law-updated')) {
            navigate(`/information/${url}?law=${name}&page=1`);
        } else {
            navigate(`/information/${url}`);
        }
    };

    // 항목 렌더링
    const renderItems = (parentId = null, depth = 0) => {
        return (
            isOpen &&
            Object.keys(contents)
                .filter(key => contents[key].parent === parentId)
                .map(key => (
                    <div key={key} id="sidebar-items">
                        <div
                            id="sidebar-item"
                            style={{ paddingLeft: `${depth * 12}px`, color: `${colorStyle[depth]}` }}
                            className={`overflow-hidden text-ellipsis whitespace-nowrap ${depth === 0 ? 'font-semibold' : ''}`}
                            onClick={() => handlePageClick(contents[key])}
                            data-tooltip-id={`tooltip-${key}`}
                            data-tooltip-content={contents[key].name}
                        >
                            {contents[key].name}
                        </div>
                        {renderItems(parseInt(key), depth + 1)}
                    </div>
                ))
        );
    };

    return (
        <>
            <div id="info-sidebar">
                <div className="items-center grid grid-cols-12 gap-4">
                    {isOpen && <span className="col-span-9 text-xl font-bold" onClick={() => handlePageClick('main') }>정보게시판</span>}
                    {!isOpen && <span className="col-span-3"></span>}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-sm relative"
                        data-tooltip-id="sidebar-toggle-tooltip"
                        data-tooltip-content={isOpen ? '사이드바 닫기' : '사이드바 열기'}
                    >
                        {isOpen ? '<<' : '>>'}
                    </button>
                </div>
                {renderItems()}
            </div>
            {/* 툴팁설정 */}
            <Tooltip id="sidebar-toggle-tooltip" place="top" />
            {Object.keys(contents).map(key => (
                <Tooltip key={key} id={`tooltip-${key}`} place="top" />
            ))}
        </>
    );
}

export default InfoSideBar;