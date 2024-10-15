import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCommunityStore } from "../../store/useCommunityStore";
import useStore from "../../store/useStore";

import DOMPurify from "dompurify";

// 백과 연결되면 여기 navigate(route)로 바꿀 것!

function PatchButton ({id, title, content, className}) {
  const BASE_URL = useStore.getState().BASE_URL;
  const patchCommunityDetail = useCommunityStore((state) => state.patchCommunityDetail)
  const cleanContent =DOMPurify.sanitize(content);
  const navigate = useNavigate();
  // onSubmit 함수
  const onSubmit = async () => {
    if (!title.trim()) {
      alert('제목을 작성1해주세요')
    }
    else if (!content.trim()) {
      alert('내용을 작성해주세요')
    }
    else {
      try { 
        const response = await patchCommunityDetail({id : id, comTitle : title, comDescription: cleanContent}) // 위에서 props로 받기 때문에, 데이터셋을 정할 필요 없이 바로 title: title 등으로 넣을 수 있음
        alert('게시글이 수정되었습니다!')
        navigate(`/community/general/${id}`);
      } catch(err) {
        alert('게시글 수정에 실패했습니다.')
      }
    }
  };
  return (
    <button
      className={`${className} border-2 w-[95px] h-[38px] hover:bg-gray-100`}
      onClick={onSubmit}>
        수정
      </button>
  )
}
export default PatchButton;