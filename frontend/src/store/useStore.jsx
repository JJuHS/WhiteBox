import { create } from 'zustand';

const useStore = create((set) => ({
    BASE_URL: process.env.REACT_APP_API_URL,
    "start": "cross-env NODE_ENV=development react-scripts start",
    "build": "cross-env NODE_ENV=production react-scripts build",
}))

export default useStore;