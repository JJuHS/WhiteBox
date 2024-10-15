import React, { useEffect, useState } from "react";
import AiDescriptionCard from "./AiDescriptionCard";
import { useNavigate, useParams } from "react-router-dom";
import useAIStore from "../../store/useAIStore";
import AiVoteModal from "./AiVoteModal";

const initData = {
    aiCreatedAt:'"2024-09-27T17:09:52.709755"',
    aiOtherFault:50,
    aiUserFault:50,
    aiRelatedInformation:'',
    aiRelatedLaw:'',
    uploaded:false,
    voteIndex:1
}

function AiDetail () {
    const navigate = useNavigate();
    const { id } = useParams();
    const [ data, setData ] = useState(initData);
    const getData = useAIStore((state) => state.getAIResult)
    const [ videoSrc, setVideoSrc] = useState('');
    const [ showVoteModal, setShowVoteModal ] = useState(false);

    const handleAiVoteModal = () => {
        setShowVoteModal(true);
    }
    const closeAiVoteModal = () => {
        setShowVoteModal(false);
    }

    const navigateVoteDetail = () => {
        if (window.confirm("투표게시판으로 이동하시겠습니까?")) {
            navigate(`/community/vote/${data.voteIndex}`)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await getData({ id });
            setData(fetchedData);
            setVideoSrc(fetchedData.aiVideoUrl);
        }
        fetchData();
    }, [getData, id])

    const formatData = (date) => {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0'); 
        const day = String(newDate.getDate()).padStart(2, '0');
        const hours = String(newDate.getHours()).padStart(2, '0');
        const minutes = String(newDate.getMinutes()).padStart(2, '0');
        const seconds = String(newDate.getSeconds()).padStart(2, '0');

        return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="mt-10">
            <div className="bg-none border-none text-white w-full">
                {videoSrc ? (
                    <video controls autoPlay className="w-full h-auto">
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                ) : (
                    <p>비디오를 불러오는 중입니다...</p>
                )}
            </div>
            <div className={`&${showVoteModal ? 'blur-xl' : ''}`}>
                <p className="mt-3 flex justify-end text-xs">영상 업로드 : {formatData(data.aiCreatedAt)}</p>
                <div className="flex-row md:grid grid-cols-2 gap-4">
                    <div className="col-span-1">
                        
                        <AiDescriptionCard type='ratio' content={[data.aiUserFault, data.aiOtherFault]}/>
                        <AiDescriptionCard type='precedent' content={data.aiExplanation}/>
                    </div>
                    <div className="col-span-1">
                        <AiDescriptionCard type='description'content={data.aiDescription}/>
                        <AiDescriptionCard type='situation' content={data.aiResult}/> 
                        <AiDescriptionCard type='law' content={data.aiRelatedLaw}/>
                    </div>
                </div>
                <div className="flex justify-end mt-3 md:grid grid-cols-4 gap-4">
                    <div className="col-span-3"></div>
                    {data.uploaded ? 
                        <div onClick={navigateVoteDetail} className="cursor-pointer border rounded-lg p-2 text-center">투표게시판 이동</div>
                        : 
                        <div onClick={handleAiVoteModal} className="cursor-pointer border rounded-lg p-2 text-center">투표올리기</div>
                    }
                </div>
            </div>
            {showVoteModal && <AiVoteModal id={id} closeModal={closeAiVoteModal} videoSrc={videoSrc}/>}
        </div>
    )
}

export default AiDetail;
