import React from "react";
import { Route, Routes } from "react-router-dom"

import CommunityGeneralCreate from '../components/community/CommunityGeneralCreate';
import CommunityGeneralList from '../components/community/CommunityGenralList';
import CommunityGeneralDetail from '../components/community/CommunityGeneralDetail';
import CommunityVoteList from '../components/community/CommunityVoteList';
import CommunityVoteDetail from '../components/community/CommunityVoteDetail';

const CommunityRoutes = () => {
    return (
        <Routes>
            <Route path="/general/" element={<CommunityGeneralList />} />
            <Route path="/general/post" element={<CommunityGeneralCreate />} />
            <Route path="/general/:id" element={<CommunityGeneralDetail />} />
            <Route path="/vote/" element={<CommunityVoteList />} />
            <Route path="/vote/:id" element={<CommunityVoteDetail />} />
        </Routes>
    )
}

export default CommunityRoutes;