import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import SubmitButton from '../buttons/SubmitButton';
import PatchButton from '../buttons/PatchButton';
import CommunityGeneralTabs from './CommunityGeneralTabs';
import { useCommunityStore } from '../../store/useCommunityStore';
import { Helmet } from 'react-helmet';

function MyComponent() {
  const location = useLocation();
  const { id } = location.state || {};
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const getCommunityDetail = useCommunityStore((state) => state.getCommunityDetail); // 게시판 목록 불러오기

  useEffect(() => {
    const getDetail = async () => {
      try {
        const response = await getCommunityDetail({ id: id });
        setTitle(response.comTitle);
        setValue(response.comDescription);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    getDetail();
  }, [id]);

  const handleSubmitData = () => {
    // HTML 문자열을 DOM으로 변환
    const parser = new DOMParser();
    const doc = parser.parseFromString(value, 'text/html');

    // 이미지와 텍스트 분리
    const images = Array.from(doc.getElementsByTagName('img')).map(img => img.src);
    const description = doc.body.innerText; // 텍스트 내용
    return {
      description,
      images, // 이미지 배열
    };
  };
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ["bold", "underline", "italic"],
        ["image"],
      ]
    },
  };

  return (
    <div>
      <Helmet>
        <title>White box | 게시글 작성</title>
      </Helmet>
      <CommunityGeneralTabs />
      <div className="grid grid-cols-12">
        <div className="col-span-2"></div>
        <div className="max-w-[1300px] col-span-8">
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목"
            className="relative h-[40px] w-[100%] border-x-2 border-b-0 p-5" />
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="h-[300px]"
            modules={modules}
            placeholder="드래그 앤 드랍으로 이미지 넣기" />
          <div className="relative w-auto mt-16 flex justify-end">
            {id ?
              <PatchButton
                id={id}
                title={title}
                content={handleSubmitData().description}
              /> :
              <SubmitButton
                title={title}
                description={handleSubmitData().description}
                images={handleSubmitData().images} // 이미지 배열
                className="relative"
              />
            }
          </div>
        </div>
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}

export default MyComponent;
