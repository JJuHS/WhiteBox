import React, { useState, useEffect } from "react";
import useInformationStore from "../../store/useInformationStore";

function InformationTerm() {
    const [ searchTerm, setSearchTerm ] = useState(""); // 검색
    const [ searchQuery, setSearchQuery ] = useState(""); // 검색 쿼리
    const [ itemsPerPage, setItemsPerPage ] = useState(10); // 페이지당 개수
    const [ currentPage, setCurrentPage ] = useState(1); // 현재 페이지 
    const [ expandedTerms, setExpandedTerms ] = useState([]); // 확장된 용어 
    const loadData = useInformationStore((state) => state.getTermList)
    const [ terms, setTerms ] = useState([]);

    // 데이터 가져오기
    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const data = await loadData();
                const dataWithId = data.map((term, index) => ({
                    ...term,
                    id: index
                }))
                setTerms(dataWithId)
            } catch (err) {
                console.log(err);
            }
        };
        fetchTerms();
    }, [])    

    // 검색하기
    const applySearch = () => {
        setSearchQuery(searchTerm);
        setCurrentPage(1);
    }

    // enter로 검색
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            applySearch();
        }
    }

    // 검색 초기화
    const resetSearch = () => {
        setSearchTerm("");
        setSearchQuery("");
        setCurrentPage(1);
        setExpandedTerms([]);
    }

    // 검색 필터링
    const filteredTerms = terms.filter((term) => {
        return term.name.toLowerCase().includes(searchQuery.toLowerCase());
    })

    // 페이지네이션 개수 정하기
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTerms = filteredTerms.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredTerms.length / itemsPerPage);

    // 용어 확장 토글
    const toggleExpandTerm = (id) => {
        setExpandedTerms((prev) =>
            prev.includes(id) ? prev.filter((termId) => termId !== id) : [...prev, id]
        );
    };

    // 페이지당 표시 개수 변경
    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    }

    // 페이지네이션 이동
    const handleClickPage = (index) => {
        if (index < 0 || index >= totalPages) return;
        setCurrentPage(index + 1)
        setExpandedTerms([])
    }
    
    return (
        <div>
            <h2 className="text-center mt-5 mb-3 font-bold text-2xl">용어 정리</h2>
            <div className="flex justify-between items-center ml-4">
                {/* 검색 */}
                <div className="flex">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="검색어를 입력하세요"
                        className="p-2 border rounded mr-2"
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        onClick={applySearch}
                        className="p-2 border rounded mr-2"
                    >
                        검색
                    </button>
                    <button
                        onClick={resetSearch}
                        className="p-2 border rounded"
                    >
                        초기화
                    </button>
                </div>
                {/* 페이지당 아이템 개수 */}
                <div>
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="p-1 border rounded"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                    </select>
                    <span>&nbsp;개씩 보기</span>
                </div>
            </div>

            {/* 용어 목록 로드 */}
            <ul className="mt-4 ml-4">
                {currentTerms.map((term) => (
                <li key={term.id} className="border-b py-2">
                    <div
                    className="cursor-pointer text-sm text-black-500 hover:underline"
                    onClick={() => toggleExpandTerm(term.id)}
                    >
                    {term.name}
                    </div>
                    {expandedTerms.includes(term.id) && (
                    <div className="text-sm mt-2 p-2">
                        <p>➔ {term.description}</p>
                    </div>
                    )}
                </li>
                ))}
            </ul>
        
            {/* 페이지네이션 */}
            <div className="flex justify-center mt-4 space-x-2">
                <button onClick={() => {handleClickPage(0)}}>
                    &lt;&lt;
                </button>
                <button onClick={() => {handleClickPage(currentPage - 2)}}>
                    &lt;
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => handleClickPage(index)}
                    className={`p-2 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    {index + 1}
                </button>
                ))}
                <button onClick={() => {handleClickPage(currentPage)}}>
                    &gt;
                </button>
                <button onClick={() => {handleClickPage(totalPages - 1)}}>
                    &gt;&gt;
                </button>
            </div>
        </div>
    );
};

export default InformationTerm;