import { create } from 'zustand';
import { get, patch, post, deleteRequest } from '../utils/api.jsx'
import useStore from './useStore.jsx';
import axios from 'axios';
const BASE_URL = useStore.getState().BASE_URL;
const accessToken = localStorage.getItem('accessToken');

const useAIStore = create((set) => ({
    // 영상 올리기
    uploadVideo: async({ video }) => {
        
        try {
            const url = `${BASE_URL}/upload-video`;
            const headers = {
                Authorization: accessToken,
            }
            const formData = new FormData();
            formData.append('video', video)
            const response = await axios.post(url, formData, { headers });
            return response
        } catch (err) {
            console.log(err);
        }
    },
    // ai-result-detail
    getAIResult: async ({ id }) => {
        try {
            const url = `${BASE_URL}/my/${id}`
            const headers = {
                Authorization: accessToken
            }
            const response = await get(url, {}, headers)
            return response
        } catch (err) {
            console.log(err);
        }
    },
    // 투표올리기
    postVote: async ({ id, title, description, images, expirationDate }) => {
        try {
            const url = `${BASE_URL}/vote/${id}`
            const headers = {
                Authorization: accessToken,
                'Content-Type': 'multipart/form-data'
            }

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('expirationDate', expirationDate);
            if (!!images) {
                images.forEach((image) => {
                formData.append(`images`, image);
            });
            }
            
            const response = await axios.post(
                url, formData, {headers}
            )
            return response
        } catch (err) {
            console.log(err);
        }
    },
    // get-ai-result
    getAiJudgement: async ({ file }) => {
        try {
            const url = `https://localhost:8000/analyze-video`
            const headers = {
                Authorization: accessToken
            }
            const formData = new FormData();
            formData.append('file', file)
            const response = await axios.post(url, formData, headers)
        } catch (err) {
            console.log(err);
        }
    }
    // ai-list
}))

export default useAIStore;
