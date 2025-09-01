import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000', // backend URL
    withCredentials: true // to send cookies in every request
})

export default api;