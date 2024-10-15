import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VoteButton from '../../public/img/community-vote.svg'
import { useCommunityStore } from '../../store/useCommunityStore';

const VoteGraph = ({voteId, approvalPercent, neutralPercent, oppositePercent, className }) => {
  const [data, setData] = useState({
    rateMy: 0,
    rateYour: 0,
    rateNeutral: 0,
  });
  
  const [isVoted, setIsVoted] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null); // 선택된 투표 유형
  useEffect(() => {
        setData({
          rateMy: approvalPercent,
          rateYour: oppositePercent,
          rateNeutral: neutralPercent,
        });
      }, [approvalPercent, oppositePercent, neutralPercent]);   
  // 재투표 못하게 막기
  const postVoteFunction = useCommunityStore((state) => state.postVoteFunction); // 게시판 목록 불러오기
  const getCommunityVoteDetail = useCommunityStore((state) => state.getCommunityVoteDetail)
  const handleVote = async (voteType) => {
    try {
      const response = await postVoteFunction({voteId, voteTarget: selectedVote})
      if (response.status === 200) {
        const newResponse = getCommunityVoteDetail({voteId})
        setIsVoted(true);
        alert('투표되었습니다.')
        window.location.reload();
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  
  const selectedVoteType = (voteType) => {
    setSelectedVote(voteType);
  }
  
  return (
    <div className={`vote-graph border ${className} inline-block`}>
      <div className="w-full h-10 flex place-content-between">
          <div className="flex flex-wrap min-w-[300px] w-full h-10 rounded">
            <div
              className="h-full bg-[#DC1B3E] focus:bg-red-800 cursor-pointer"
              style={{ width: `calc(150px + (800px - 450px) * ${data.rateMy / 100})` }}
              onClick={() => selectedVoteType(1)}
              tabIndex="0"
            >
              <span className="text-white text-xl p-1">{`게시자 과실: ${data.rateMy}%`}</span>
            </div>
            <div
              className="h-full bg-gray-100 focus:bg-gray-300 cursor-pointer"
              style={{ width: `calc(150px + (800px - 450px) * ${data.rateNeutral / 100})` }}
              onClick={() => selectedVoteType(3)}
              tabIndex="0"
            >
              <span className="text-black text-xl p-1">{`중립: ${data.rateNeutral}%`}</span>
            </div>
            <div
              className="h-full bg-[#458EF7] focus:bg-blue-700 cursor-pointer"
              style={{ width: `calc(150px + (800px - 450px) * ${data.rateYour / 100})` }}
              onClick={() => selectedVoteType(2)}
              tabIndex="0"
            >
              <span className="text-white text-xl p-1">{`상대 과실: ${data.rateYour}%`}</span>
            </div>
          </div>
          <button
            type="button" 
            className="flex flex-row w-[120px] h-[40px] border-[0.5px] hover:bg-gray-100 focus:bg-gray-100 cursor-pointer"
            onClick={handleVote}>
            <img src={VoteButton} alt="" />
            <p className="text-[25px]">투표</p>
          </button>
        </div>
      </div>
  );
};

export default VoteGraph;
