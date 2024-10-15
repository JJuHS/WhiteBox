import "../../styles/auth/user-profile.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import useAuthStore from "../../store/useAuthStore";
import lawyerBadge from "../../public/img/lawyerBadge.png";
import LawyerAuthModal from "./LawyerAuthModal";
import MyAccidentList from "./MyAccidentList";
import MyPostedCommunityList from "./MyPostedCommunityList";
import MyVoteList from "./MyVoteList";
import { Helmet } from 'react-helmet';
import { formatDistanceToNow, parseISO, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import { ko } from "date-fns/locale";

function UserProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef();
    const [ showTab, setShowTab ] = useState(1);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = parseISO(dateString);
        const distance = formatDistanceToNow(date, {
            locale: ko, 
        });
        return distance
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    }
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

    const renderCommunity = () => {
        if (showTab === 1) {
            return (
                <div><MyAccidentList /></div>
            )
        } else if (showTab === 2) {
            return (
                <div><MyPostedCommunityList /></div>
            )
        } else {
            return (
                <div><MyVoteList /></div>
            )
        }
    }

    return (
        <div>
            <div className={`profile-container ${showModal ? 'blur-xl' : ''}`} onClick={handleOutsideClick}>
                <Helmet>
                    <title>White Box | {user?.nickname || ''}의 프로필</title>
                </Helmet>
                <div className="title-user-profile">
                    <div className="profile">
                        <div>
                            닉네임 : {user?.nickname || ''}
                        </div>
                        <div>
                            이메일 : {user?.id || ''}
                        </div>
                        <div>
                            White - Box와 함께한지 {formatDate(user?.registrationDate)}
                        </div>
                    </div>
                    <div className="lawyer">
                        {user?.isLawyer === true ? (
                            <img src={lawyerBadge} alt="변호사 배지" className="lawyer-badge" />
                        ) : (
                            <button onClick={handleOpenModal}>변호사 회원 인증</button>
                        )}
                    </div>
                </div>
                <div className="community">
                    <div className="grid grid-cols-12">
                        <div className="col-span-2"></div>
                        <div className={`col-span-2 m-3 cursor-pointer p-2 text-center hover:bg-orange-200 ${showTab === 1 ? 'bg-orange-200' : 'bg-orange-50'}`} onClick={() => setShowTab(1)}>내 사고</div>
                        <div className={`col-span-2 m-3 cursor-pointer p-2 text-center hover:bg-orange-200 ${showTab === 2 ? 'bg-orange-200' : 'bg-orange-50'}`} onClick={() => setShowTab(2)}>내가 쓴 글</div>
                        <div className={`col-span-2 m-3 cursor-pointer p-2 text-center hover:bg-orange-200 ${showTab === 3 ? 'bg-orange-200' : 'bg-orange-50'}`} onClick={() => setShowTab(3)}>내가 한 투표</div>
                        <div className="col-span-4"></div>
                    </div>
                    <div className="grid grid-cols-12">
                        <div className="col-span-2"></div>
                        <div className="col-span-8">{renderCommunity()}</div>
                        <div className="col-span-2"></div>
                    </div>
                </div>
            </div>
            {showModal && (
                <LawyerAuthModal closeModal={closeModal} user={user} setUser={setUser} />
            )}
        </div>
    );
};

export default UserProfile;