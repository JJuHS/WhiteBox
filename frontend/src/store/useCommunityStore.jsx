import axios from 'axios';
import { create } from 'zustand';
import useStore from './useStore.jsx'
import useAuthStore, {getAcessToken} from './useAuthStore.jsx'
import { get, patch, post, deleteRequest } from '../utils/api.jsx'
import { useEffect } from 'react';

const BASE_URL = useStore.getState().BASE_URL;
const accessToken = localStorage.getItem('accessToken')

const useCommunityStore = create((set) => ({
    // 일반게시판 목록 불러오기
    getCommunityGeneralList: async ({ pageId }) => {
        if (!pageId) {
            pageId = 1
        }
        try {
            const url = `${BASE_URL}/community/page/${pageId}`;
            // const url = '/dummy/Communitydb.json'
            // if문 통해 accessToken이 없을 경우 공란으로 냄겨둠
            const headers = accessToken ? {
                Authorization: `${accessToken}`,
            } : {};
            const response = await get(url, {}, headers);
            return response
        } catch (err) {
            throw err;
        }
    },
    // 일반게시물 불러오기
    getCommunityDetail: async ({id}) => {
        try {
            const url = `${BASE_URL}/community/${id}`;
            const headers = {
                Authorization: `${accessToken}`,
            };
            const response = await get(url, {}, headers);
            return response
        } catch (err) {
            console.log( err);
        }
    },
    //일반게시물 작성하기
    postCommunityGeneral: async ({ title, description, images }) => {
        try {
            const url = `${BASE_URL}/community`;
            // FormData 객체 생성
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            if (images) {
                images.forEach((imageBlob, index) => {
                    formData.append(`images`,imageBlob, `image_${index}.jpg`)
                }) // 파일이 있는 경우 추가
            }
            // accessToken이 있을 경우 헤더 설정
            const headers = accessToken ? {
                Authorization: `${accessToken}`,
                'Content-Type': 'multipart/form-data', // 멀티파트 요청을 위해 Content-Type 설정
            } : {};

            for (let [key, value] of formData.entries()) { 
            }

            // POST 요청
            const response = await axios.post(url, formData, { headers });
            return response;
        } catch (err) {
            throw(err)
        }
    },
    // 일반게시글 수정하기
    patchCommunityDetail: async ({id, comTitle, comDescription}) => {
        try {
            const url = `${BASE_URL}/community/${id}`;
            const headers =  accessToken ? {
                Authorization: `${accessToken}`,
            } : {};
            const response = await patch(url, {comTitle, comDescription}, headers); 
            return response
        } catch (err) {
            console.log( err);
            throw err;
        }
    },
    

    // 일반게시물 삭제하기
    deleteCommunityDetail: async ({id}) => {
        try {
            const url = `${BASE_URL}/community/${id}`;
            const headers =  accessToken ? {
                Authorization: `${accessToken}`,
            } : {};
            const response = await deleteRequest(url, {}, headers); 
            return response
        } catch (err) {
            console.log( err);
            throw err;
        }
    },


    // 일반게시판 댓글 작성하기
    postCommunityComment: async ({ id, comment }) => {
        try {
            const url = `${BASE_URL}/community/${id}`;
            const headers = accessToken ? {
                Authorization: `${accessToken}`,
                'Content-Type': 'application/json', // 멀티파트 요청을 위해 Content-Type 설정
            } : {};

            // POST 요청
            const response = await axios.post(url, {comment}, { headers });
            return response;
        } catch (err) {
            throw(err)
        }
    },
    // 일반게시판 댓글 삭제하기
    deleteCommunityComment: async ({id, commentId}) => {
        try {
            const url = `${BASE_URL}/community/${id}/${commentId}`;
            const headers =  accessToken ? {
                Authorization: `${accessToken}`,
            } : {};
            const response = await deleteRequest(url, {}, headers); 
            return response
        } catch (err) {
            console.log( err);
            throw err;
        }
    },

    // 투표게시글 목록 불러오기
    getCommunityVoteList: async ({pageIndex}) => {
        try {
            const url = `${BASE_URL}/vote/page/${pageIndex}`;
            const headers = {
                Authorization: `${accessToken}`,
            };
            const response = await get(url, {}, headers); 
            return response
        } catch (err) {
            console.log( err);
            throw err;
        }
    },
    // 메인페이지 게시글 목록 불러오기
    getMainCommunityList: async() => {
        try {
            const url = `${BASE_URL}/mainpage/top-votes`;
            const headers = {
                Authorization: `${accessToken}`,
            };
            const response = await get(url, {}, headers);
            return response
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    // 투표게시글 상세 불러오기
    getCommunityVoteDetail: async ({voteId}) => {
        try {
            const url = `${BASE_URL}/vote/${voteId}`
            const headers = {
                Authorization: `${accessToken}`,
            };
            const response = await get(url, {}, headers);
            return response
        } catch (err) {
            throw(err)
        }
    },

    // 투표게시판 댓글 작성하기
    postVoteComment: async ({ id, comment }) => {
        try {
            const url = `${BASE_URL}/vote/${id}/comment`;
            const headers = accessToken ? {
                Authorization: `${accessToken}`,
                'Content-Type': 'application/json', // 멀티파트 요청을 위해 Content-Type 설정
            } : {};

            // POST 요청
            const response = await axios.post(url, {comment}, { headers });
            return response;
        } catch (err) {
            throw(err)
        }
    },
    // 투표게시판 댓글 삭제하기
    deleteVoteComment: async ({id, commentId}) => {
        try {
            const url = `${BASE_URL}/vote/${id}/comment/${commentId}`;
            const headers =  accessToken ? {
                Authorization: `${accessToken}`,
            } : {};
            const response = await deleteRequest(url, {}, headers); 
            return response
        } catch (err) {
            throw err;
        }
    },
    // 투표하기
    postVoteFunction: async ({ voteId, voteTarget }) => {
        try {
            const url = `${BASE_URL}/vote/${voteId}/${voteTarget}`;
            const headers = accessToken ? {
                Authorization: `${accessToken}`,
                'Content-Type': 'application/json', // 멀티파트 요청을 위해 Content-Type 설정
            } : {};
            // POST 요청
            const response = await axios.post(url, {voteId, voteTarget}, { headers });
            return response;
        } catch (err) {
            throw(err)
        }
    },
}))


export {useCommunityStore};