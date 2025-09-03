import axios from 'axios';

const api = axios.create({
    baseURL: 'https://todo-6r6w.onrender.com/', // backend URL
    withCredentials: true // to send cookies in every request
})

export default api;