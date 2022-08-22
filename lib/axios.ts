import Axios from 'axios';

const API_URL =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.API_URL;

export const axios = Axios.create({
    baseURL: API_URL
});

axios.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);
