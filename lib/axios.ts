import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_X_API_KEY,
  }
});

export default axiosInstance;
