import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000',
});

const accessToken = localStorage.getItem('accessToken');
const AUTH_TOKEN = `Bearer ${accessToken}`; // Replace with your actual auth token
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default instance;