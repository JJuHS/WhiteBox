import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCommunityStore } from "../../store/useCommunityStore";
import useStore from "../../store/useStore";


function DeleteButton ({id, className}) {
  const BASE_URL = useStore.getState().BASE_URL;
  const deleteCommunityDetail = useCommunityStore((state) => state.deleteCommunityDetail)
  const navigate = useNavigate();
  // onSubmit 함수
  const onSubmit = async () => {
    try {
      const response = await deleteCommunityDetail({ id }) // 위에서props로 받기 때문에, 데이터셋을 정할 필요 없이 바로 title: title 등으로 넣을 수 있음
      alert('게시글이 삭제되었습니다')
      navigate(`/community/general`);
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