import axios from 'axios';

const BASE_URL = 'http://ip:3000/api';

const instance = axios.create({
    baseURL: BASE_URL,

    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default instance;
