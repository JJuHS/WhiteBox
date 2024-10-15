import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange, className='' }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  if (totalPages === 1) return null; // 페이지가 1개이면 페이지네이션을 표시하지 않음
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className={`relative flex justify-center mt-4 mb-10 ${className}`}>
      <div className='cursor-pointer px-2 py-2 mx-1 text-xs' onClick={() => handlePageChange(currentPage - 1)}>
        &lt;&lt;
      </div>
      <div className='cursor-pointer px-2 py-2 mx-1 text-xs' onClick={() => handlePageChange(1)}>
        &lt;
      </div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
        <button
        key={page}
        className={`px-2 py-1 mx-1 border rounded ${currentPage === page ? 'bg-[#2C2C2C] text-white' : 'hover:bg-gray-200'}`}
        onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
          <div className='cursor-pointer px-2 py-2 mx-1 text-xs' onClick={() => handlePageChange(currentPage + 1)}>
            &gt;
          </div>
          <div className='cursor-pointer px-2 py-2 mx-1 text-xs' onClick={() => handlePageChange(totalPages)}>
            &gt;&gt;
          </div>
    </div>
  );
};

export default Pagination;
