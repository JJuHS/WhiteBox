import React from "react";
import ClipLoader from 'react-spinners/ClipLoader';

function Loading ({ isLoading, setIsLoading }) {
    
    return (
        <div className="flex flex-col items-center justify-center h-full" style={{ height: 'calc(100vh - 90px)' }}>
            <ClipLoader size={40} color={"#3498db"} loading={isLoading} />
            <p className="mt-4">로딩 중...</p>
            <p className="mt-4">약 1분 정도 소요됩니다.</p>
        </div>
    )
}

export default Loading;