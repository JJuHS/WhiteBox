import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { ko } from "date-fns/locale";

function MyPostedCommunityList () {
    const navigate = useNavigate();
    const loadMyPostings = useAuthStore((State) => State.getMyPostings);
    const [ myPostings, setMyPostings ] = useState(null);
    const [ pageId, setPageId ] = useState(1);
    const [ postsCount, setPostsCount ] = useState(0);
    const itemsPerPage = 5;

    // 시간 포매팅
    const formattingTime = (dateString) => {
        return formatDistanceToNow(parseISO(dateString), { addSuffix: true, locale: ko });
    }

    // 데이터 로드
    useEffect(() => {
        const fetchMyPosts = async() => {
            const fetchedMyPosts = await loadMyPostings({ pageId })
            if (fetchedMyPosts.totalCommunities === 0) {
                setMyPostings(null)
            } else {
                setMyPostings(fetchedMyPosts.userCommunities);
                setPostsCount(fetchedMyPosts.totalCommunities);
            }
            
        };
        fetchMyPosts();
    }, [pageId, loadMyPostings])

    // 페이지 네이션을 위한 총 페이지 계산
    const totalPages = Math.ceil(postsCount / itemsPerPage);
    const handlePageChange = (newPageId) => {
        if (newPageId >= 1 && newPageId <= totalPages) {
            setPageId(newPageId);
        }
    }

    // 디테일 페이지로 이동
    const handleClickDetail = ({ pageId }) => {
        navigate(`/community/general/${pageId}`)
    }

    return (
        myPostings ? (
            <div className="mt-3">
            {/* 영상 목록 */}
            {myPostings.map((post) => (
                <div key={post.comIndex} className="p-2 grid grid-cols-12 border shadow m-2 cursor-pointer hover:bg-gray-300">
                    <span className="col-span-8 cursor-pointer font-semibold" onClick={() => handleClickDetail({pageId:post.comIndex})}>{post.comTitle}</span>
                    <div className="col-span-4">
                        <div className="grid grid-cols-2">
                            <span className="text-sm col-span-1">{formattingTime(post.comCreatedAt)}</span>
                            <span className="text-sm col-span-1">조회수 : {post.commentCount}</span>
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
                <span>작성한 글이 없습니다.</span>
            </div>
        )
    )
}

export default MyPostedCommunityList;