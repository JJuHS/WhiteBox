import React, { useEffect, useState } from 'react'; 
import ServiceDescriptionCard from './ServiceDescriptionCard';
import CommunityList from './CommunityList';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import useAIStore from '../../store/useAIStore.jsx'
import { Helmet } from 'react-helmet';
import "../../styles/main/main.css";
import mainGIF from '../../public/img/sample.gif'
import mainManualGIF from '../../public/img/main-manual.gif'

function Main() {
    const navigate = useNavigate();
    // isLogin 받기
    const isLogin = localStorage.getItem('accessToken');
    // 로딩중
    const [ isLoading, setIsLoading ] = useState(false);
    // 비디오파일
    const [ videoFile, setVideoFile ] = useState(null);
    const [ videoName, setVideoName ] = useState(null);
    const getAiJudgement = useAIStore((state) => state.getAiJudgement)
    const uploadVideo = useAIStore((state) => state.uploadVideo);
    // 파일 드래그 앤 드롭
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('video/')) {
            setVideoFile(file);
            setVideoName(file.name);
        }
    }
    const handleDragOver = (e) => {
        e.preventDefault();
    }
    // 파일 첨부
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('video/')) {
            setVideoFile(file);
            setVideoName(file.name);
        }
    }

    // 파일 삭제
    const handleRemoveFile = () => {
        setVideoFile(null);
        setVideoName(null);
    }

    // ai 가랏
    const handleClickAiJudegement = async() => {
        if (!isLogin) {
            window.alert("Please login");
            navigate('/auth/login')
        } else {
            setIsLoading(true);
            // ai 판단 api 보내기, 판단 끝나면 ai-detail페이지로 이동하기
            const response = await uploadVideo({video:videoFile});
            navigate(`/ai-judgement/${response.data.id}`)
            setIsLoading(false)
            return;
        }
    }
    // 컨텐츠 더 있어요!! 를 보여주기
    const [ isBottom, setIsBottom ] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.innerHeight + window.scrollY;
            const bottom = document.documentElement.offsetHeight;
            setIsBottom(scrollPosition >= bottom);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    
    const [ isVisible, setIsVisible ] = useState(true);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsVisible(prev => !prev);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleScrollClick = () => {
        window.scrollTo({
            top:window.innerHeight / 2,
            behavior: "smooth"
        })
    }
    return (
        <div>
            <Helmet>
                <title>White Box</title>
            </Helmet>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-full" style={{ height: 'calc(100vh - 90px)' }}>
                    <ClipLoader size={40} color={"#3498db"} loading={isLoading} />
                    <p className="mt-4">로딩 중...</p>
                    <p className="mt-4">약 1분 정도 소요됩니다.</p>
                </div>
            ) : (
                
                <div className="w-[100vw] grid grid-cols-12 gap-4 h-full" style={{ height: 'calc(100vh - 90px)' }}>
                    <div className="col-span-2">
                    </div>
                    {/* gif 파일 */}
                    {isLogin ? 
                    (<div className="col-span-4 hidden md:flex items-center justify-center">
                        <img src={mainGIF} alt="GIF" className="shadow-xl max-w-full max-h-full bg-red-300" />
                    </div>)
                    :(<div className="col-span-4 hidden md:flex items-center justify-center">
                        <img src={mainManualGIF} className='shadow-xl max-w-full max-h-full bg-red-300' alt="" />
                    </div>)
                    }
                    
                    {/* 비디오 드래그 앤 드롭 */}
                    <div className='col-span-8 flex items-center justify-center md:col-span-4'>
                        <div 
                            className="rounded-3xl p-6 pt-12 shadow-2xl"
                            onDrop={ handleDrop }
                            onDragOver={ handleDragOver }
                        >
                            {videoFile ? (
                                <div>
                                    <div>
                                        <span>{videoName}</span>
                                        <button onClick={handleRemoveFile} className='mt-2 bg-red-500 text-white px-4 py-2 rounded cursor-pointer'>
                                            x
                                        </button>
                                    </div>
                                    <div>
                                        <button onClick={handleClickAiJudegement} className='mt-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>
                                            AI판단 보러 가기
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center space-y-4">
                                    <p>여기에 파일을 끌어다 놓으세요.</p>
                                    <input
                                        id="fileInput"
                                        type="file" 
                                        accept="video/*" 
                                        onChange={handleFileInputChange} 
                                        className="hidden"
                                    />
                                    <label 
                                        htmlFor="fileInput" 
                                        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
                                    >
                                        파일 첨부
                                    </label>
                                </div>
                                
                            )}
                        </div>
                    </div>
                    <div className="col-span-2"></div>
                </div>
            )}
            <div className="mt-3 border-t-2 pt-3">
                {isLogin ? (
                    <div className='grid grid-cols-12'>
                        <div className='col-span-2'></div>
                        {/* 투표게시판 */}
                        <div className='col-span-4 m-1 w-full'>
                            <CommunityList type="vote"/>
                        </div>
                        {/* 일반게시판 */}
                        <div className='col-span-4 m-1 w-full'>
                            <CommunityList type="general"/>
                        </div>
                        <div className='col-span-2'></div>
                    </div> 
                    ) : (
                    <ServiceDescriptionCard />
                )}
            </div>
            {!isBottom && (
                <div>
                    {isVisible && (
                        <div className="text-gray-500 fixed bottom-10 left-10 mb-4 ml-4 rotate-icon flex" onClick={handleScrollClick}>
                            <span className='cursor-pointer'>&gt;&gt;&gt;</span>
                        </div>
                    )}
                    {!isVisible && (
                        <div className="text-gray-300 fixed bottom-20 left-10 mb-4 ml-4 rotate-icon flex" onClick={handleScrollClick}>
                            <span className='cursor-pointer'>&gt;&gt;&gt;</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Main;
