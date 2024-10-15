import CommunityVoteTabs from "./CommunityVoteTabs";
import { useEffect, useState } from "react";
import CommentImg from '../../public/img/comment.svg'
import axios from "axios";
import { useCommunityStore } from '../../store/useCommunityStore'
import Pagination from './CommunityPagination'
import blankImage from '../../public/img/blank-image.svg'
import dayjs from 'dayjs'
import VoteGraph from './CommunityVoteGraph'
import { useParams, useNavigate } from "react-router-dom";
import CommentPostForm from './CommunityVoteCommentPost'
import VoteCommentDeleteButton from '../buttons/VoteCommentDeleteButton'
import { Helmet } from 'react-helmet';
import lawyerBadge from '../../public/img/lawyerBadge.png'
import CommunityVoteAiResult from './CommunityVoteAiResult'
import neutralVote from '../../public/img/neutral-vote.svg'
import closeVote from '../../public/img/close-vote.svg'
import circleVote from '../../public/img/circle-vote.svg'

function CommunityGeneralDetail() {
  const storedUser = localStorage.getItem ? JSON.parse(localStorage.getItem('user')) : null;
  const isLawyer = storedUser.isLawyer
  // 게시글 정보 가져오기 
  const voteId = useParams().id;
  const  [data, setData] = useState({
    aiOtherFault : 0,
    aiRelatedInformation : '',
    aiRelatedLaw: '',
    aiResult: '',
    aiUserFault: 0,
    approvalPercent: 0,
    comments: [],
    commentsCount: 0,
    createdAt: '',
    description: '',
    hit: '',
    isimage: '', //data에서는 isimage가 아닌 image로 나오므로 주의!
    images: [],
    neutralPercent: 0,
    oppositePercent: 0,
    title: '',
    video: '', //data에서는 videoUrl로 나오므로 주의!
    voteId: 0,
    votesCount: 0,
    nickname: '',
    voteType: 0,
  });
  const [error, setError] = useState(null);
  
  // 댓글 정보 가져오기(페이지네이션)
  const getCommunityVoteDetail = useCommunityStore((state) => state.getCommunityVoteDetail); // 게시판 목록 불러오기
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지와, 이동할 페이지, default 값은 1
  const [itemsPerPage] = useState(10); // 한 페이지에 들어갈 아이템의 수
  
  useEffect(() => {
    const loadCommunityCommentList = async () => {
        try {
          const response = await getCommunityVoteDetail({voteId});
          const date = dayjs(response.createdAt).format('YYYY-MM-DD HH:mm');
          setData({
            aiOtherFault : response.aiOtherFault,
            aiDescription : response.aiDescription,
            aiResult : response.aiResult,
            // aiRelatedInformation: '신호기에 의해 교통정리가 이루어지지 않는 삼거리 교차로에서 차량이 좌회전 중 왼쪽에서 오른쪽으로 직진 중인 이륜차와 충돌한 사고입니다',
            aiRelatedLaw: response.aiRelatedLaw,
            // aiRelatedLaw: '도로교통법 제2조(정의), 도로교통법 제 25조(교차로 통행방법), 도로교통법제 26조(교통정리가 없는 교차로에서의 양보운전)',
            aiUserFault: response.aiUserFault,
            approvalPercent: response.approvalPercent,
            comments: response.comments,
            commentsCount: response.commentsCount,
            createdAt: date,
            description: response.description,
            hit: response.hit,
            isimage: response.image, //data에서는 isimage가 아닌 image로 나오므로 주의!
            images: response.images,
            neutralPercent: response.neutralPercent,
            oppositePercent: response.oppositePercent,
            title: response.title,
            videoUrl: response.videoUrl, //data에서는 videoUrl로 나오므로 주의!
            voteId: response.voteId,
            votesCount: response.votesCount,
            // votesCount: 347,
            userType: response.userType,
            nickname: response.nickname,
            voteType: response.voteType,
            }) 
            console.log('사진들 = ',data);
        } catch (err) {
          console.log(err);
          throw err
        }
      }
      loadCommunityCommentList();
  }, [getCommunityVoteDetail, voteId]);


  // 페이지네이션 관련 변수들
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.comments.length > 0 ? data.comments.slice(indexOfFirstItem, Math.min(data.comments.length, indexOfLastItem)) : [];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  // 댓글 작성 시 새로고침 기능
  const handleCommentUpdate = (newComments, lastComment) => {
    setData((prevData) => ({
      ...prevData,
      comments: newComments,
    }));
    setCurrentPage(Math.ceil(lastComment/10));
  };

  // 투표 따른 댓글 표현
  const renderVoteType = (voteType) => {
    switch (voteType) {
      case 1:
        return <img src={circleVote} className="h-8 w-8"></img>;
      case 2:
        return <img src={closeVote} className="h-8 w-8"></img>;
      case 3:
        return <img src={neutralVote} className="h-8 w-8 bg-gray-500"></img>;
      case 4:
        return <div className=""></div>;
      default:
        return "알 수 없음";
    }
  };
  

  return (
    <div>
      <Helmet>
        <title>White box | 투표게시판 | {data.title}</title>
      </Helmet>
      <CommunityVoteTabs className="col-span-8"/>
      <div className="grid grid-cols-12 min-h-[300px]">
        <div className="col-span-2"></div>
        {/* 여기서부터 글 컨테이너 */}
        <div className="max-w-[1300px] col-span-8 place-content-center">
          <div className= "h-auto border-x-2">
            <div className="flex border-box min-h-[34px] px-[7px] p-1 bg-[#BBBBBB]"><p className="text-xl">{data.title}</p></div>
              <div className="flex flex-row border-box place-content-between text-[15px] mt-2">
                <div className="inline-block ml-5">{data.nickname}</div>
                <div className="flex flex-row mr-5">
                  <span className="mr-1">투표 수</span>
                  <span className="text-[#231FE8]">{data.votesCount}</span>
                  <span className="mx-2">|</span>
                  <span className="">작성일 {data.createdAt}</span>
                </div>
              </div>
            {/* 내용 */}
            <div className="min-h-[300px] p-3">
              {/* 비디오 */}
              <div className="flex flex-col place-content-between">
                {data.videoUrl ?
                <video autoplay width="700" controls>
                <source src={data.videoUrl} type="video/mp4" />
                </video>
                :<p>{data.videoUrl}</p>}
              {/* 현장사진 */}
                {data.images ? 
                <div>
                  <p>현장사진</p>
                  <div className="grid grid-cols-2 gap-4 max-w-[700px] max-h-[400px] m-2">
                    {data.images.map((image, idx) => (
                      <img
                      key={idx}
                      src={image.imageUrl}
                      alt='#'
                      // 스마트폰 사진비율 16:9에 맞춤
                      className= "w-[304px] h-[171px]"
                      />
                    )) }
                </div>
                </div> : <div></div>}
              </div>
              <p className="min-h-[30px] font-normal mt-10">{data.description}</p>
            </div>
            <div className="sticky top-0 bg-white">
            <CommunityVoteAiResult 
              aiUserFault={data.aiUserFault}
              aiOtherFault={data.aiOtherFault}
              aiRelatedInformation={data.aiDescription}
              aiResult={data.aiResult}
              aiRelatedLaw={data.aiRelatedLaw} />
            {/* 투표 */}
            <VoteGraph
              voteId = {voteId}
              approvalPercent = {data.approvalPercent}
              neutralPercent = {data.neutralPercent}
              oppositePercent = {data.oppositePercent}
              className=""
              />
              </div>
              <div>총 투표 수 : {data.votesCount}</div>
            {/* 댓글 영역 */}
            <div className="w-auto h-[73px] border-y-2 my-4 flex align-middle">
              <img 
                src={CommentImg}
                alt=""
                className="pl-7"
              />
            </div>
            {/* 댓글 */}
            <div className="space-y-1 px-2 pb-3 pt-2">
            <CommentPostForm id={voteId} onCommentUpdate={handleCommentUpdate} />
            {currentItems.length > 0 ? (
            currentItems.map((comment, idx) => {
                const commentDate = dayjs(comment.postedAt).format('YYYY-MM-DD HH:mm')
                return (
                <div key={idx} className="flex flex-col min-h-[95px] border-b-2">
                <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                  {comment.userType === "LAWYER" ?  <img src={lawyerBadge} alt="" className="h-8 w-8" /> : <></>}
                <div className="block place-content-center">{renderVoteType(comment.voteType)}</div>
                  <div className="border-box text-xl">{comment.userNickname}</div>
                  </div>
                  <div className="justify-self-end col-span-3 text-xl">{commentDate}</div>
                </div>
                <div className="place-content-center mt-4 ml-3">{comment.comment}</div>
                </div>)
              })): (
              <p>댓글 없음!</p>
            )
          }
            </div>
            <Pagination
            totalItems={data.comments.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            className="relative w-auto"
            />
          </div>
      </div>
        <div className="col-span-2"></div>
    </div>
    </div>
  )
}

export default CommunityGeneralDetail;