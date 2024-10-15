import axios from 'axios';

// Axios 인스턴스 설정
const api = axios.create({
    baseURL: '', // 기본 URL 설정
    timeout: 1000000, // 요청 타임아웃 시간 설정
    headers: { 'Content-Type': 'application/json' }, // 기본 헤더 설정
});

// GET 요청
export const get = async (url, params = {}, headers = {}) => {
    const response = await api.get(url, { params, headers: { ...api.defaults.headers, ...headers } });
    return response.data;
};

// POST 요청
export const post = async (url, data = {}, headers = {}) => {
    const response = await api.post(url, data, { headers: { ...api.defaults.headers, ...headers } });
    return response.data;
};

// PATCH 요청
export const patch = async (url, data = {}, headers = {}) => {
    const response = await api.patch(url, data, { headers: { ...api.defaults.headers, ...headers } });
    return response.data;
};

// DELETE 요청
export const deleteRequest = async (url, params = {}, headers = {}) => {
    const response = await api.delete(url, { params, headers: { ...api.defaults.headers, ...headers } });
    return response.data;
};

