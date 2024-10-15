import axios from 'axios';
import { create } from 'zustand';
import useStore from './useStore.jsx'
import { get, patch, post, deleteRequest } from '../utils/api.jsx'


const BASE_URL = useStore.getState().BASE_URL;
const accessToken = localStorage.getItem('accessToken');

const useInformationStore = create((set) => ({
    getSiteList: async () => {
        try {
            const url = `${BASE_URL}/board/related-sites`
            const headers = {
                Authorization: accessToken
            }
            const response = await get(url, {}, headers)
            return response
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    
    getTermList: async () => {
        try {
            const url = `${BASE_URL}/board/terms`
            const headers = {
                Authorization: accessToken
            }
            const response = await get(url, {}, headers)
            return response
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    
    getLawInformations: async ({ id, lawUrl }) => {
        try {
            const url = `${BASE_URL}/board/${lawUrl}/${id}`
            const headers = {
                Authorization: accessToken
            }
            const response = await get(url, {}, headers)
            return response
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}))

export default useInformationStore;