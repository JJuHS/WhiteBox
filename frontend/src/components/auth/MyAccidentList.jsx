import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { ko } from "date-fns/locale";
import { formatDistanceToNow, parseISO } from "date-fns";

function TumbnailRotator({ thumbnails }) {
    const [ activeId, setActiveId ] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const newActiveId = (activeId + 1) % thumbnails.length;
            setActiveId(newActiveId);
        }, 1000);
        return () => clearInterval(interval);
    })

    return (
        <div className="flex items-center justify-center overflow-hidden" style={{ width: '100%', height: '100%' }}>
            <img src={thumbnails[activeId]} alt="" style={{ maxWidth: '100%', maxHeight: '100%' }}/>
        </div>
    )
}


function MyAccidentList () {
    const navigate = useNavigate();
    const [ videoList, setVideoList ] = useState(null);
    const [ pageId, setPageId ] = useState(1);
    const [ totalVideoCount, setTotalVideoCount ] = useState(0);
    const loadVideoList = useAuthStore((state) => state.getMyVideos);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchVideoList = async () => {
            const fetchedVideoList = await loadVideoList({ pageId });
            if (fetchedVideoList.totalVideos === 0) {
                setVideoList(null)
            } else {
                setVideoList(fetchedVideoList.userVideos);
                setTotalVideoCount(fetchedVideoList.totalVideos)
            }
        }
        fetchVideoList();
    }, [pageId, loadVideoList]);

    const totalPages = Math.ceil(totalVideoCount / itemsPerPage);

    const handlePageChange = (newPageId) => {
        if (newPageId >= 1 && newPageId <= totalPages) {
            setPageId(newPageId);
        }
    }

    const handleClickDetail = ({pageId}) => {
        navigate(`/ai-judgement/${pageId}`)
    };

    const formatDate = (date) => {
        return formatDistanceToNow(parseISO(date), { addSuffix: true, locale: ko})
    }
    return (
        <div>
            {/* 영상 목록 */}
            {videoList && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                        {videoList.map((video) => {
                            const thumbnails = [
                                video.thumbnail1,
                                video.thumbnail2,
                                video.thumbnail3,
                                video.thumbnail4
                            ];
                            return (
                            <div key={video.aiIndex} onClick={() => handleClickDetail({pageId:video.aiIndex})}
                                className="grid grid-cols-4 border shadow cursor-pointer hover:bg-gray-300 rounded"
                            >
                                <div className="col-span-3">
                                    <TumbnailRotator thumbnails={thumbnails} />
                                </div>
                                <div className="col-span-1 flex items-center justify-end pe-2 truncate">
                                    <span className="text-xs">{formatDate(video.createdAt)}</span>
                                </div>
                            </div>
                        )})}
                    </div>
                    {/* 페이지네이션 */}
                    <div className="mt-3 flex justify-center items-center">
                        <span className="me-2 cursor-pointer" onClick={() => handlePageChange(1)}>&lt;&lt;</span>
                        <span className="me-2 cursor-pointer" onClick={() => handlePageChange(pageId - 1)}>&lt;</span>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`cursor-pointer m-1 p-2 rounded-lg ${pageId === index + 1? "bg-gray-400 text-white" : "hover:bg-gray-300"}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <span className="ms-1 me-2 cursor-pointer" onClick={() => handlePageChange(pageId + 1)}>&gt;</span>
                        <span className="me-2 cursor-pointer" onClick={() => handlePageChange(totalPages)}>&gt;&gt;</span>
                    </div>
                </div>
            )}
            {!videoList && (
                <div className="mt-3 ml-4">
                    <span>내 사고 내역이 없습니다.</span>
                </div>
            )}
        </div>
    )
}

export default MyAccidentList;


