import axios from 'axios';

const API_URL = 'http://localhost:8089/api/auth';

export const registerUser = (username, password) => {
    return axios.post(`${API_URL}/register`, { username, password });
};

export const loginUser = (username, password) => {
    return axios.post(`${API_URL}/login`, { username, password });
};
