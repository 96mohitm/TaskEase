import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8000/api/', // Adjust this to your Django backend URL
  timeout: 5000, // Adjust as needed
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosInstance;
