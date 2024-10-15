import React from "react";
import { Route, Routes } from "react-router-dom"
import AiDetail from "../components/aiJudgement/AiDetail.jsx"
import { Helmet } from 'react-helmet';

const AiJudgementRoutes = () => {
    return (
        <div className="grid grid-cols-12 gap-4">
            <Helmet>
                <title>White Box | AI 과실 판단</title>
            </Helmet>
        {/* 첫 2칸 여백 */}
        <div className="col-span-2"></div>

        {/* 메인 컨텐츠 8칸 */}
        <div className="col-span-8">
            <Routes>
                <Route path="/:id" element={<AiDetail />} />
            </Routes>
        </div>

        {/* 마지막 2칸 여백 */}
        <div className="col-span-2"></div>
    </div>
    )
}

export default AiJudgementRoutes;