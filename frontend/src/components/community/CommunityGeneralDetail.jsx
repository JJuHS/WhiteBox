import CommunityGeneralTabs from "./CommunityGeneralTabs";
import { useEffect, useState } from "react";
import CommentImg from '../../public/img/comment.svg';
import { useCommunityStore } from '../../store/useCommunityStore';
import { useParams } from "react-router-dom";
import Pagination from './CommunityPagination';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../buttons/DeleteButton";
import CommentDeleteButton from "../buttons/CommentDeleteButton";
import CommunityGeneralCommentPost from "../community/CommunityGeneralCommentPost";
import lawyerBadge from '../../public/img/lawyerBadge.png'
import { Helmet } from 'react-helmet';

// const storedUser = JSON.parse(localStorage.getItem('user'));
// const storedUserId = storedUser.nickname
// const isLawyer = storedUser.isLawyer


function CommunityGeneralDetail() {
  const [ storedUser, setStoredUser ] = useState({})
  const [ storedUserId, setStoredUserId ] = useState('')
  const [ isLawyer, setIsLawyer ] = useState(false)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setStoredUser(parsedUser)
      setStoredUserId(parsedUser.nickname)
      setIsLawyer(parsedUser.isLawyer)
    }
  }, [])

  const { id } = useParams();
  const getCommunityDetail = useCommunityStore((state) => state.getCommunityDetail);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [data, setData] = useState({
    nickname: '',
    title: '',
    description: '',
    images: [],
    createdAt: '',
    hit: '',
    comments: [],
    userType: '',
  });
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await getCommunityDetail({ id });
        const date = dayjs(response.comCreatedAt).format('YYYY-MM-DD HH:mm');
        setData({
          nickname: response.userNickname,
          title: response.comTitle,
          description: response.comDescription,
          images: response.images,
          hit: response.comHit,
          comments: response.comments,
          createdAt: date,
          userType: response.userType,
        });
      } catch (error) {
        console.log('오류 발생', error);
        setError(error);
      }
    };
    getDetail();
  }, [id]);

  // 페이지네이션 관련 변수들
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.comments.length > 0 ? data.comments.slice(indexOfFirstItem, Math.min(data.comments.length, indexOfLastItem)) : [];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 수정 기능
  const navigate = useNavigate();
  function handleMovePage() {
    navigate('/community/general/post', { state: { id } });
  }
  
  // 댓글 작성 시 새로고침 기능
  const handleCommentUpdate = (newComments, lastComment) => {
    setData((prevData) => ({
      ...prevData,
      comments: newComments
    }));
    setCurrentPage(Math.ceil(lastComment/10));
  };

  return (
    <div>
      <Helmet>
        <title>White Box | 일반게시판 | {data.title}</title>
      </Helmet>
      <CommunityGeneralTabs className="col-span-8" />
      <div className="grid grid-cols-12 min-h-[300px]">
        <div className="col-span-2"></div>
        <div className="max-w-[1300px] col-span-8 place-content-center">
          <div className="h-auto border-x-2">
              {storedUserId === data.nickname ?
            <div className="flex flex-row place-content-end mr-5 mb-2">
              <button onClick={handleMovePage} className="block hover:underline">수정</button>
              <div className="mx-2">|</div>
              <DeleteButton id={id} className="block hover:underline" />
            </div> : <p></p>}
            <div className="flex border-box min-h-[34px] bg-gray-200">
              <p className="py-1 text-xl ml-5">{data.title}</p>
            </div>
            <div className="flex flex-row border-box place-content-between text-[15px] mt-2 border-b-2">
              <div className="inline-block ml-5">{data.nickname}</div>
              <div className="flex flex-row mr-5">
                <span className="inline-block">조회수 {data.hit}</span>
                <span className="mx-2">|</span>
                <span className="inline-block">작성일 {data.createdAt}</span>
              </div>
            </div>
            <div className="min-h-[200px] p-3">
              {data.images && data.images.length > 0 ? (
                <div className="max-w-[300px] flex flex-col place-content-center m-4">
                  {data.images.map((image, idx) => (
                    <div key={idx}>
                      <img src={image.imageUrl} alt="이미지 로딩 불가" />
                    </div>
                  ))}
                </div>
              ) : <div></div>}
              <div className="min-h-[30px] font-normal" dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
            <div className="w-auto h-12 border-y-2 my-4 flex align-middle">
              <img src={CommentImg} alt="" className="pl-4" />
            </div>
            <div className="flow-root space-y-1 px-2 pb-3 pt-2">
              <CommunityGeneralCommentPost id={id} onCommentUpdate={handleCommentUpdate} />
              {currentItems.length > 0 ? (
                currentItems.map((comment, idx) => {
                  const commentDate = dayjs(comment.postedAt).format('YYYY-MM-DD HH:mm');
                  return (
                    <div key={idx} className="flex flex-col h-auto border-b-2 p-1 pb-3">
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-row">
                          {comment.userType === "LAWYER" ?  <img src={lawyerBadge} alt="" className="h-6 w-6" /> : <></>}
                          <div className="border-box ml-3 text-xl">{comment.userNickname}</div>
                        </div>
                        <div className="flex flex-row gap-5">
                          <div className="flex items-center justify-self-end col-span-3 text-sm">{commentDate}</div>
                          {storedUserId === comment.userNickname ?
                          <CommentDeleteButton id={id} onCommentUpdate={handleCommentUpdate} commentId={comment.id} userNickname={comment.userNickname} className="block hover:underline mr-5" />
                          : <p className="block mr-[52px]"></p>
                          }
                        </div>
                      </div>
                      <div className="mt-4 ml-3">{comment.comment}</div>
                    </div>
                  );
                })
              ) : (
                <p>댓글이 없습니다.</p>
              )}
            </div>
            <Pagination
              totalItems={data.comments.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              className="relative w-auto"
            />
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </div>
  );
}

export default CommunityGeneralDetail;
