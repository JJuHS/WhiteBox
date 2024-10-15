import React from "react";
import { useNavigate } from 'react-router-dom';
import { useCommunityStore } from "../../store/useCommunityStore";
import useStore from "../../store/useStore";

function SubmitButton({ title, description, className, images }) {
  const BASE_URL = useStore.getState().BASE_URL;
  const postCommunityGeneral = useCommunityStore((state) => state.postCommunityGeneral);
  const navigate = useNavigate();
  // Base64 문자열을 Blob으로 변환하는 함수
  const base64ToBlob = (base64Data) => {
    // MIME 타입 추출 (image/jpeg 또는 image/png 등)
    const mimeType = base64Data.match(/^data:(image\/\w+);base64,/)[1]; 
    // Base64 데이터에서 MIME 타입 제거
    const byteCharacters = atob(base64Data.replace(/^data:image\/\w+;base64,/, ""));
    // Blob 생성
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([new Uint8Array(byteNumbers)], { type: mimeType });
  };

  // onSubmit 함수
  const onSubmit = async () => {
    if (window.confirm('정치, 혐오 발언, 욕설을 포함한 게시글에 대해서는 제재 및 심한 경우 법적 대응을 받을 수 있습니다. 게시하시겠습니까??')) {
      try {
        if (!title.trim()) {
          alert('제목을 입력하세요');
          return; // 입력 체크 후 함수 종료
        }
        else if (!description.trim()) {
          alert('내용을 입력하세요');
          return; // 입력 체크 후 함수 종료
        }
  
        // Base64 이미지 배열을 Blob으로 변환
        const imageBlobs = images.map(base64ToBlob);
        // postCommunityGeneral 호출 시 Blob 배열 전달
        const response = await postCommunityGeneral({ title, description, images: imageBlobs });
        navigate(`../general/${response.data.comIndex}`);
      } catch (err) {
        console.log( err);
      }
    }
  };

  return (
    <button
      className={`border-2 w-[95px] h-[38px] hover:bg-gray-100 ${className}`}
      onClick={onSubmit}>
      제출
    </button>
  );
}

export default SubmitButton;
