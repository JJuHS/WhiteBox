import React, { useEffect, useState } from 'react';
import "../../styles/auth/lawyer-auth-modal.css";
import useAuthStore from '../../store/useAuthStore';

function LawyerAuthModal({ closeModal, user, setUser }) {
    const authLawyer = useAuthStore((state) => state.authLawyer);
    const [ name, setName ] = useState('');
    const [ birth, setBirth ] = useState('');
    const [ file, setFile ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        } else {
            setFile(null);
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        if (name === '') {
            window.alert('이름을 입력하세요');
            setIsLoading(false);
            return;
        } else if (birth === '') {
            window.alert('생일을 입력하세요');
            setIsLoading(false);
            return;
        } else if (file === null) {
            window.alert('파일을 업로드하세요');
            setIsLoading(false);
            return;
        } else {
            const response = await authLawyer({ name, date: birth, image: file })
            if (response && response.data && response.data.includes("변호사 인증 및 상태 업데이트 완료")) {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                // 'isLawyer' 업데이트
                const updatedUser = { ...storedUser, isLawyer: true };
                // 업데이트된 'user' 객체를 localStorage에 저장
                localStorage.setItem('user', JSON.stringify(updatedUser));
                // 상태 업데이트
                setUser(updatedUser);
                window.alert('인증 성공하였습니다.');
                setIsLoading(false);
                closeModal();
                return;
            } else {
                window.alert('인증 실패하였습니다.');
                setIsLoading(false);
                closeModal();
                return;
            }
        }
    }

    const handleRemoveFile = () => {
        setFile(null);
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[48rem]">
                {/* 이름 받기 */}
                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 w-1/4">이름</label>
                    <input
                        type="text"
                        className="w-3/4 px-3 py-2 border rounded-lg"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                {/* 생일 받기 */}
                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 w-1/4">생일</label>
                    <input 
                        type="date"
                        className="w-3/4 px-3 py-2 border rounded-lg"
                        value={birth}
                        onChange={(e) => setBirth(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                    />
                </div>
                {/* 파일 받기 */}
                <div className="mb-4 flex items-center">
                    <label className="block text-gray-700 w-1/4">이미지 업로드</label>
                    <div className='flex items-center justify-between w-3/4'>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className='bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 inline-block'>
                            {file? '파일 변경' : '파일 선택'}
                        </label>
                        {file && (
                            <div className='flex items-center justify-center w-3/4'>
                                <span>{file.name}</span>
                                <span className="text-red-500 cursor-pointer mx-2" onClick={() => {handleRemoveFile()}}>x</span>
                            </div>
                        )}
                    </div>
                </div>
                {/* 제출 하기 */}
                <div className='flex justify-between'>
                    <button
                        onClick={() => closeModal()}
                        className="px-4 py-2 rounded-lg hover:bg-gray-300"
                        disabled={isLoading}
                        >
                        취소
                    </button>
                    <button
                        onClick={() => handleSubmit()}
                        className={`px-4 py-2 rounded-lg hover:bg-gray-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        제출
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LawyerAuthModal;