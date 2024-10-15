import React, { useState } from "react";
import useAIStore from "../../store/useAIStore";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

function AiVoteModal ({ id, closeModal }) {
    const navigate = useNavigate();
    const [ title, setTitle ] = useState("");
    const [ content, setContent ] = useState("");
    const [ files, setFiles ] = useState([]);
    const [ voteDuration, setVoteDuration ] = useState("");
    const postVote = useAIStore((state) => state.postVote)
    const [ isLoading, setIsLoading ] = useState(false);

    const handleSubmit = async () => {
        if (window.confirm("게시글을 제출하면 수정 및 삭제할 수 없습니다. 제출하시겠습니까?")) {
            setIsLoading(true);
            if (title === '') {
                window.alert('제목을 입력하세요')
            } else if (content === '') {
                window.alert('내용을 입력하세요')
            } else {
                const response = await postVote({ id, title, description:content, images:files, expirationDate:voteDuration});
                closeModal();
                navigate(`/community/vote/${response.data.voteId}`)
            }
            setIsLoading(false);
        }
    }

    const getVoteDuration = (day) => {
        const now = new Date();
        now.setDate(now.getDate() + parseInt(day));
        const isoString = now.toISOString();
        return isoString.slice(0, -1) + '111';
    }

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles((prev) => [...prev, ...newFiles]);
    }

    const handleRemoveFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[48rem]">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <ClipLoader size={40} color={"#3498db"} loading={isLoading} />
                        <p className="mt-4">로딩 중...</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold mb-4">투표올리기</h2>
                        {/* Title */}
                        <div className="mb-4 flex items-center">
                            <label className="block text-gray-700 w-1/4">투표 제목</label>
                            <input
                                type="text"
                                className="w-3/4 px-3 py-2 border rounded-lg"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        {/* Content */}
                        <div className="flex items-center mb-4">
                            <label className="block text-gray-700 w-1/4">내용</label>
                            <textarea
                                className="w-3/4 px-3 py-2 border rounded-lg"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        {/* Add File */}
                        <div className="flex items-center mb-4">
                            <label className="block text-gray-700 w-1/4">추가 사진</label>
                            <div className="flex w-1/4">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 inline-block"
                                >
                                    {files.length > 0 ? "파일 추가" : "파일 선택"}
                                </label>
                            </div>
                            <ul className="w-1/2">
                                {files.map((file, i) => { 
                                    const fileSizeKB = file.size / 1024;
                                    const displaySize =
                                    (fileSizeKB > 1024)? `${Math.floor(fileSizeKB / 1024)} MB` : `${Math.floor(fileSizeKB)} KB`;
                                    return (
                                    <li key={i} className="flex justify-between w-full border rounded-lg p-1 items-center">
                                        <span className="flex-1">{file.name}</span>
                                        <span>{displaySize}</span>
                                        &nbsp;&nbsp;&nbsp;
                                        <button
                                            onClick={() => handleRemoveFile(i)}
                                            className=" text-red-500"
                                        >
                                            x
                                        </button>
                                    </li>
                                    );
                                })}
                            </ul>
                        </div>
                        {/* Vote Duration */}
                        <div className="flex items-center mb-4">
                            <label className="block text-gray-700 w-1/4">투표 기간</label>
                            <div className="w-3/4 flex space-x-4">
                                {["1", "3", "7", "15"].map((day) => (
                                <label key={day}>
                                    <input
                                    type="radio"
                                    name="duration"
                                    value={getVoteDuration(day)}
                                    onChange={() => setVoteDuration(getVoteDuration(day))}
                                    className="mr-2"
                                    />
                                    {day}일
                                </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 rounded-lg hover:bg-gray-300"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 rounded-lg hover:bg-gray-300"
                            >
                                제출하기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AiVoteModal;