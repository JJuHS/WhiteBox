import axios from 'axios';
import { create } from 'zustand';
import useStore from './useStore.jsx'
import { get, patch, post, deleteRequest } from '../utils/api.jsx'
import { useNavigate } from 'react-router-dom';

const BASE_URL = useStore.getState().BASE_URL;
const accessToken = localStorage.getItem('accessToken')

const useAuthStore = create((set) => ({
    accessToken: null,
    user: {
        nickname: "",
        registrationDate: "",
        id: "",
        isLawyer: false,
    },

    isLogin: () => {
        return !!localStorage.getItem('accessToken');;
    },

    getUser: () => {
        const userInfo = JSON.parse(localStorage.getItem('user'));
        return (!!userInfo && userInfo)
    },

    checkEmail: async ({ id }) => {
        const res = {
            "isSuccess": true,
            "code": 200,
            "message": "이메일 체크 성공",
        }
        return res;
 
    },

    checkNickname: async({ nickname }) => {
        const res = {
            "isSuccess": true,
            "code": 200,
            "message": "닉네임 체크 성공",
        }
        return res;
 
    },

    signUp: async({ id, password, nickname }) => {
        try {
            const url = `${BASE_URL}/users`;
            const data = {
                user_email: id,
                user_password: password,
                user_nickname: nickname,
                user_type: "MEMBER",
            }
            
            const response = await post(url, data);
            return response;
        } catch (err) {
            console.log( err);
            throw err;
        }
    },

    login: async({ id, password }) => {

        try {
            const url = `${BASE_URL}/users/login`;
            const data = {
                user_email:id,
                user_password:password
            }
            const headers = { 'Content-Type': 'application/json' };
            const response = await axios.post(url, data, { headers });
            const userData = response.data
            const accessToken = response.headers.authorization

            if (accessToken) {
                localStorage.setItem('user', JSON.stringify({
                    nickname: userData.userNickname,
                    registrationDate: userData.registrationDate,
                    id,
                    isLawyer: userData.userType === 'LAWYER',
                }))
                localStorage.setItem('accessToken', accessToken)
            }

            set({
                accessToken,
                user: {
                    nickname: userData.userNickname,
                    registrationDate: userData.registrationDate,
                    id,
                    isLawyer: userData.userType === 'LAWYER',
                },
            })
            return {
                isSuccess: true,
                nickname:userData.userNickname
            }
        } catch (err) {
            console.log( err);
            return { isSuccess:false }
        }
    },

    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        set({
            accessToken: null,
            user: {
                nickname: "",
                registrationDate: "",
                id: "",
                isLawyer: false
            }
        });
    },

    // 변호사 인증하기
    authLawyer: async({ name, date, image }) => {
        const user = JSON.parse(localStorage.getItem('user'));
        const userEmail = user ? user.id : null;
        try {
            const url = `${BASE_URL}/verify-lawyer`;
            const headers = {
                Authorization: localStorage.getItem('accessToken'),
            };
            const formData = new FormData();
            formData.append('lawyerName', name);
            formData.append('lawyerDate', date);
            formData.append('email', userEmail);
            formData.append('file', image)

            const response = await axios.post(url, formData, { headers });
            console.log(response);
            return response;
        } catch (err) {
            const errorMsg = err.response.data
            window.alert(errorMsg.split(':')[0])
            return err.response
        }
    },

    // 내 영상 목록 가져오기
    getMyVideos: async ({ pageId }) => {
        try {
            const url = `${BASE_URL}/my/videos/${pageId}`;
            const headers = {
                Authorization: localStorage.getItem('accessToken'),
            };
            const response = await get(url, {}, headers);
            return response;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    // 내가 쓴 글 목록 가져오기
    getMyPostings: async ({ pageId }) => {
        try {
            const url = `${BASE_URL}/my/community/${pageId}`
            const headers = {
                Authorization: localStorage.getItem('accessToken'),
            };
            const response = await get(url, {}, headers);
            return response;
        } catch (err) {
            console.log(err);
        }
    },
    // 나의 투표목록 불러오기
    getMyVotes: async ({ pageId }) => {
        try {
            const url = `${BASE_URL}/my/prefix/${pageId}`
            const headers = {
                Authorization: localStorage.getItem('accessToken'),
            };
            const response = await get(url, {}, headers);
            return response;
        } catch (err) {
            console.log(err);
        }
    },
}))

export default useAuthStore;