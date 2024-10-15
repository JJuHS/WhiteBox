import communityIcon from '../../public/img/community-general-deactive.svg'
import voteIcon from '../../public/img/community-vote.svg'
import "../../styles/community/communitygenrallist.css"
import { Tooltip } from "react-tooltip";

function CommunityVoteTabs() {
  return (
    // 전체 컴포넌트
    <div className="grid grid-cols-12">
      {/* 그리드 좌측 여백 세 칸 차지 */}
      <div className="col-span-2"></div>
      {/* 여기부터 투표게시판 컴포넌트 */}
        <div className="max-w-[1300px] col-span-8 border-x-2 p-3">
          {/* 게시판 탭 */}
          <div className="flex flex-row">
            <a href="/community/vote" 
              className="community-tab-active flex items-center text-xl font-bold"
            >
              <img 
                src={voteIcon} 
                alt=""
                className="w-8 h-8 place-content-center" 
                />
              <p className="flex-grow text-center">투표</p>
              <div className='mr-2'></div>
            </a>
            <a 
              href="/community/general" 
              className="community-tab-deactive flex items-center text-xl hover:bg-gray-100 font-bold"
              id="vote-list-title-tooltip"
              data-tooltip-id="community-tab-tooltip"
              data-tooltip-content="정치, 혐오글, 욕설 금지입니다."
            >
              <img 
                src={communityIcon}
                alt="자유"
                className="w-8 h-8 place-content-center mt-1"
                />
              <p className='flex-grow text-center'>일반</p>
              <div className='mr-2'></div>
            </a>
            <Tooltip id="community-tab-tooltip" place="bottom"/>
            </div>
          {/* 게시판 안내 */}
          <div className="pt-4 pb-3 community-notice border-y-[2px] border-black flex flex-col place-content-center p-1">
            <h1 className="text-2xl mt-2 mb-4 font-semibold">투표 게시판</h1>
            <p className='text-md line-clamp-3 mb-1'>
            교통사고 영상을 분석하고 의견을 나누는 공간입니다. 회원 여러분의 소중한 의견을 투표를 통해 나눠주세요.
            </p>
          </div>
          </div>
          </div>
)}

export default CommunityVoteTabs;
