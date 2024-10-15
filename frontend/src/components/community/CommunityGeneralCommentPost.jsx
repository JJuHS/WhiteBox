import React, { useState, getState } from 'react';
import { useParams } from 'react-router-dom';
import { useCommunityStore } from '../../store/useCommunityStore';
import { useAuthStore } from '../../store/useAuthStore'
import lawyerBadge from '../../public/img/lawyerBadge.png'

const CommunityGeneralCommentPost = ({ id, onCommentUpdate }) => {
  const [comment, setComment] = useState('');
  const postCommunityComment = useCommunityStore((state) => state.postCommunityComment);
  const getCommunityDetail = useCommunityStore((state) => state.getCommunityDetail)
  // 댓글 폼에 nickname 가져오기 위해 로컬스토리지 사용
  const user = localStorage.getItem('user')
  const userJson = user? JSON.parse(user) : null;
  const userId = userJson.nickname
  const isLawyer = userJson.isLawyer


  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      return alert('댓글을 입력하세요');
    }
    try {
      // 댓글을 포스트하고 새로운 댓글 데이터 가져오기
      const newComment = await postCommunityComment({ id, comment });
      // 댓글 상태 업데이트
      if (newComment.status === 200) {
        const response = await getCommunityDetail({ id });
        onCommentUpdate(response.comments, Math.ceil(response.comments.length)); // 새로운 댓글을 부모 컴포넌트로 전달. 이후 마지막 페이지로 이동하도록
      }
      setComment(''); // 댓글 작성 후 입력란 초기화
    } catch (error) {
      console.error( error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' & !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event)
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2 w-[100%] border-2 rounded">
      <div className="flex flex-row place-content-between w-[100%] border-b-2">
        <div className="flex flex-row items-center">
          {isLawyer === true ?  <img src={lawyerBadge} alt="" className="h-6 w-6 ms-2" /> : <></>}
          <p className="ml-3">{userId}</p>
        </div>
        <button
          type="submit"
          className="bg-blue-300 text-black p-2 hover:bg-blue-400"
        >
          댓글 작성
        </button>
      </div>
      <textarea
        value={comment}
        onChange={handleCommentChange}
        onKeyDown={handleKeyDown}
        placeholder="댓글을 작성하세요."
        className="rounded p-2 w-[100%]"
        rows="4"
      />
    </form>
  );
};

export default CommunityGeneralCommentPost;
