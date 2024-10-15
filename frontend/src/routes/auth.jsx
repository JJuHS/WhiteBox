import React from "react";
import { Route, Routes } from "react-router-dom"

import SignUp from '../components/auth/SignUp';
import Login from '../components/auth/Login';
import UserProfile from '../components/auth/UserProfile';


const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:nickname" element={<UserProfile />} />
        </Routes>
    )
}

export default AuthRoutes;