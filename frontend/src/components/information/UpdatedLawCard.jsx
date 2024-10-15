import React, { useEffect, useState } from "react";
import '../../styles/information/lawCard.css'
import useInformationStore from "../../store/useInformationStore";
import { useNavigate } from "react-router-dom";

function UpdatedLawCard ({ law, id }) {
    const navigate = useNavigate();
    const [ data, setData ] = useState({});
    const loadData = useInformationStore((state) => state.getLawInformations)
    const [ lawUrl, setLawUrl ] = useState('law')
    const checkLawUrl = () => {
        if (law === '도로교통법') {
            setLawUrl('law')
        } else if (law === '교통사고처리 특례법') {
            setLawUrl('accident-law')
        } else if (law === '특정범죄 가중처벌법') {
            setLawUrl('crime-law')
        } else {
            setLawUrl('law')  
        } 
    }

    // 데이터 불러오기
    useEffect(() => {
        checkLawUrl();
    }, [law]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await loadData({ id, lawUrl });
                setData(fetchedData);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [id, loadData, lawUrl])

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return `${dateStr.slice(0, 4)}.${dateStr.slice(4, 6)}.${dateStr.slice(6, 8)}`;
    };

    // 제목 강조를 위한 텍스트 포맷팅
    const formatText = (text) => {
        if (!text) return '';
        const tempFormattedText = text
            .replace(/<P>/g, '')
            .replace(/<\/P>/g, '\n')
            .split('<br />');
        return tempFormattedText.map((line, index) => {
            const regex = /^(제\d+[^)]*\))/;
            const match = line.match(regex);
            if (match) {
                const title = match[1];
                const remained = line.slice(match[1].length).trim();
                return (
                    <div key={index}>
                        <span className="font-semibold">{title}<br/></span>{remained}
                    </div>
                );
            }
            return (
                <div key={index}>
                    {line}
                </div>
            );
            });
    }

    if (law && law === '도로교통법 본문') {
        law = '도로교통법'
    }

    // 이전 버튼
    const handleOnClickBefore = () => {
        id += 1;
        navigate(`/information/law-updated?law=${law}&page=${id}`)
    }
    
    // 다음 버튼
    const handleOnClickAfter = () => {
        if (id === 1) return
        id -= 1;
        navigate(`/information/law-updated?law=${law}&page=${id}`)
    }
    return (
        <div className="grid grid-cols-8 gap-4 mt-4">
            {/* 이전 다음 버튼 */}
            <div className="col-span-4 text-xs whitespace-nowrap">
            <span 
                    className="border border-black rounded-full px-2 py-1 flex items-center justify-center"
                    onClick={ handleOnClickBefore }
                    id='before-btn'
                >
                    이전
                </span>
                <span className="flex mt-3 text-center justify-center">공표 : { formatDate(data.announceDate) }</span>
            </div>
            <div className="col-span-4 text-xs whitespace-nowrap">
                <span 
                    className="border border-black rounded-full px-2 py-1 flex items-center justify-center"
                    onClick={ handleOnClickAfter }
                    id='after-btn'
                >
                    다음
                </span>
                <span className="flex mt-3 text-center justify-center">시행 : { formatDate(data.startDate) }</span>
            </div>
            {/* Content */}
            <div className="col-span-8">
                <table className="min-w-full table-auto border-collapse">
                    <tbody>
                        {Object.keys(data).map((key) => {
                            if (key === 'announceDate' || key === 'startDate') return null;
                            return (
                                <tr key={key} className="grid grid-cols-2">
                                    <td className="border px-4 py-2 table-content">{formatText(data[key][0])}</td>
                                    <td className="border px-4 py-2 table-content">{formatText(data[key][1])}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UpdatedLawCard;