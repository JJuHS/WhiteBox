import React, {useEffect, useState} from 'react';
import "../../styles/community/communitygenrallist.css"
// 다른 컴포넌트 가져오기
import Pagination from "./CommunityPagination";
import WriteButton from '../buttons/WriteButton';
import CommunityGeneralCreate from './CommunityGeneralCreate'
import CommunityVoteTabs from './CommunityVoteTabs';
// Store 불러오기
import { useCommunityStore } from '../../store/useCommunityStore';
import ImageSlider from '../community/CommunityVoteImageSlider'
import hotvotepost from '../../public/img/hotvotepost.svg'
import { Helmet } from 'react-helmet';
import { formatDistanceToNow, parseISO, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

function CommunityGeneralList() {
  const getCommunityVoteList = useCommunityStore((state) => state.getCommunityVoteList);
  const [data, setData] = useState([]);
  const [totalElements, setTotalElements] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const loadCommunityVoteList = async () => {
      try {
        const response = await getCommunityVoteList({ pageIndex: currentPage });
        setData(response.content || []);
        setTotalElements(response.totalElements);
      } catch (err) {
        throw err;
      }
    }
    loadCommunityVoteList();
  }, [currentPage]);

  const indexOfLastItem = itemsPerPage;
  const indexOfFirstItem = 0;
  const currentItems = data.length > 0 ? data.slice(indexOfFirstItem, Math.min(indexOfLastItem, indexOfFirstItem + data.length)) : [];
  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const [isHovered, setIsHovered] = useState(null);

  const formatingExpirationTime = (dateString) => {
    const now = new Date();
    const expiration = new Date(dateString)

    const daysLeft = differenceInDays(expiration, now);
    if (daysLeft > 1) {
      return `D-${daysLeft}`;
    } else {
      return "종료";
    }
  }

  return (
    <div className='mt-6'>
      <Helmet>
        <title>White box | 투표게시판</title>
      </Helmet>
      <CommunityVoteTabs />
      <div className="grid grid-cols-12 border-b-2">
        <div className="col-span-2"></div>
        <div className="col-span-8 border-x-2 p-3">
          <div className="mt-10 grid grid-cols-2 2xl:grid-cols-4 gap-5">
            {currentItems.length > 0 ? (
              currentItems.map((item, idx) => (
                <a
                  href={`/community/vote/${item.voteId}`} 
                  className="flex flex-row gap-[15px] text-xl my-2 hover:border" 
                  key={item.voteId}
                  onMouseEnter={() => setIsHovered(idx)}
                  onMouseLeave={() => setIsHovered(false)}>
                  {isHovered === idx ? (
                    <ImageSlider
                      thumbnail1={item.thumbnail1}
                      thumbnail2={item.thumbnail2}
                      thumbnail3={item.thumbnail3}
                      thumbnail4={item.thumbnail4}
                      className="relative w-36 h-36"
                    />
                  ) : (
                    <img src={item.thumbnail1} className="relative w-36 h-36"/>
                  )}
                  <div className="hidden md:flex flex-col gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
                    <div className="w-48 font-bold">{item.voTitle}</div>
                    <div className="flex flex-row">
                      {item.totalVotes > 10 ? <img src={hotvotepost} alt="" className="pr-2" /> : <p></p>}
                      <div className="font-light text-[#0A3DF2]">투표 수 {item.totalVotes}</div>
                    </div>
                    <div className="w-60 right-0 font-bold">{item.nickname}</div>
                    <div className="">{formatingExpirationTime(item.expirationDate)}</div>
                  </div>
                </a>
              ))
            ) : (
              <div className="col-span-2 flex flex-nowrap gap-[15px] max-w-[397px] h-[150px] border-2 text-xl items-center my-2">아직 글이 없습니다.</div>
            )}
          </div>
          <Pagination
            totalItems={totalElements} 
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            className="relative w-auto"
          />
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
}

export default CommunityGeneralList;
