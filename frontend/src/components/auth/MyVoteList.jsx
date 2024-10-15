import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function MyVoteList () {
    const navigate = useNavigate();
    const [ voteList, setVoteList ] = useState(null);
    const [ pageId, setPageId ] = useState(1);
    const [ totalVoteCount, setTotalVoteCount ] = useState(0);
    const loadVoteList = useAuthStore((state) => state.getMyVotes);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchVoteList = async () => {
            const fetchedVoteList = await loadVoteList({ pageId });
            if (fetchedVoteList.totalVotes === 0) {
                setVoteList(null)
            } else {
                setVoteList(fetchedVoteList.userVotes);
                setTotalVoteCount(fetchedVoteList.totalVotes)    
            }
        }
        fetchVoteList();
    }, [pageId, loadVoteList]);

    const totalPages = Math.ceil(totalVoteCount / itemsPerPage);

    const handlePageChange = (newPageId) => {
        if (pageId > 1 && newPageId <= totalPages) {
            setPageId(newPageId);
        }
    }

    const handleClickDetail = ({voteId}) => {
        navigate(`/community/vote/${voteId}`);
    }

    return (
        voteList ? (
            <div className="mt-3">
            {/* 투표목록 */}
            {voteList.map((vote) => (
                <div key={vote.voteId} onClick={() => handleClickDetail({voteId:vote.voteId})} className="cursor-pointer hover:bg-gray-300 border shadow m-2 p-1">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold">{vote.title}</span>
                        <span className="text-xs">[ {vote.commentCount} ]</span>
                    </div>
                    <div>
                        <div className="flex items-center mt-2 truncate">
                            <div className="w-11/12 flex h-6">
                                <div 
                                    className="bg-blue-600"
                                    style={{
                                        width: `${Math.max(vote.approvalPercent, 2)}%`,
                                        minWidth: "10px",
                                    }}
                                >{vote.approvalPercent}%</div>
                                <div 
                                    className="bg-stone-400"
                                    style={{
                                        width: `${Math.max(vote.neutralPercent, 2)}%`,
                                        minWidth: "10px",
                                    }}
                                ></div>
                                <div 
                                    className="bg-red-600"
                                    style={{
                                        width: `${Math.max(vote.oppositePercent, 2)}%`,
                                        minWidth: "10px",
                                    }}
                                >{vote.oppositePercent}%</div>
                            </div>
                            <span className="ml-4">{vote.voteCount}명</span>
                        </div>
                    </div>
                </div>
            ))}
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
        ) : (
            <div className="mt-3 ml-4">
                <span>참여한 투표가 없습니다.</span>
            </div>
        )
    )
}

export default MyVoteList;


