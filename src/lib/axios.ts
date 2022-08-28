import Axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:3000';

export const axios = Axios.create({
    baseURL: API_URL
});

axios.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
);
