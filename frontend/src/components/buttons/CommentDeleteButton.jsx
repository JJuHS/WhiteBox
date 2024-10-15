import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCommunityStore } from "../../store/useCommunityStore";
import useStore from "../../store/useStore";

function DeleteButton ({id, className, commentId, onCommentUpdate}) {
  const BASE_URL = useStore.getState().BASE_URL;
  const deleteCommunityComment = useCommunityStore((state) => state.deleteCommunityComment)
  const getCommunityDetail = useCommunityStore((state) => state.getCommunityDetail)
  const navigate = useNavigate();
  // onSubmit 함수
  const onSubmit = async () => {
    try {
      const deletedComment = await deleteCommunityComment({id, commentId}) // 위에서 props로 받기 때문에, 데이터셋을 정할 필요 없이 바로 title: title 등으로 넣을 수 있음

      if (!deletedComment || deletedComment.status === 204) {
        const response = await getCommunityDetail({ id })
        onCommentUpdate(response.comments, Math.ceil(response.comments.length))
      }
      else {
        console.log("댓글 삭제 못했습니다");
      }
    } catch(err) {
      console.log(err)
    }
  };
  return (
    <button
      className={`${className}`}
      onClick={onSubmit}>
        삭제
      </button>
  )
}
export default DeleteButton;