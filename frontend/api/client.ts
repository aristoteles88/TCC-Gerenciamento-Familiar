import axios from 'axios';
import { getToken } from '../services/auth/authService';

const api = axios.create({
  baseURL: 'http://macbook.local:8000/',
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;