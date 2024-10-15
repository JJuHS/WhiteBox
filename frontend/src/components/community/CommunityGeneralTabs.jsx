import communityIcon from '../../public/img/community-general.svg'
import voteIcon from '../../public/img/community-vote-deactive.svg'
import "../../styles/community/communitygenrallist.css"
import { Tooltip } from "react-tooltip";

function CommunityGeneralTabs() {
  return (
    // 전체 컴포넌트
    <div className="grid grid-cols-12">
      {/* 그리드 좌측 여백 세 칸 차지 */}
      <div className="col-span-2"></div>
      {/* 여기부터 자유게시판 컴포넌트 */}
        <div className="max-w-[1300px] col-span-8 border-x-2 p-3">
          {/* 게시판 탭 */}
          <div className="flex flex-row">
            <a 
              href="/community/vote" 
              className="community-tab-deactive flex hover:bg-gray-100 items-center text-xl font-bold"
              data-tooltip-id="vote-tab-tooltip"
              data-tooltip-content="투표게시판에서는 글 및 댓글 수정, 삭제가 불가하니 유의해주세요"
            >
              <img 
                src={voteIcon} 
                alt=""
                className="w-8 h-8 place-content-center" 
                />
              <p className="flex-grow text-center">투표</p>
              <div className='mr-2'></div>
            </a>
              <Tooltip id="vote-tab-tooltip" place="bottom"/>
            <a href="/community/general" className="community-tab-active flex items-center text-xl font-bold">
              <img 
                src={communityIcon}
                alt="자유"
                className="w-8 h-8 place-content-center mt-1"
                />
              <p className='flex-grow text-center'>일반</p>
              <div className='mr-2'></div>
            </a>
            </div>
          {/* 게시판 안내 */}
          <div className="community-notice border-y-[2px] border-black flex flex-col place-content-center p-1">
            <h1 className="text-2xl mt-2 mb-4 font-semibold">일반 게시판</h1>
            <p className="text-md line-clamp-3 mb-1">
              다양한 주제에 대해 자유롭게 이야기하고 소통하는 공간입니다. 모두가 편안하게 의견을 나눌 수 있도록 서로 존중하는 커뮤니티를 만들어 갑시다. 자유롭게 글을 올리고, 의견을 나누어 보세요!
            </p>  
          </div>
          </div>
          </div>
)}

export default CommunityGeneralTabs;
