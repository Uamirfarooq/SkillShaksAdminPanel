import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../Feature/auth/authSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5500/api/v1',
});

axiosInstance.interceptors.request.use(
  config => {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
        const response = await axios.post('http://localhost:5500/api/v1/admin/refresh-token', { token: refreshToken });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        // Refresh token is invalid or expired
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        const dispatch = useDispatch();
        dispatch(logout());
        window.location.href = '/login'; // or use navigate if in a component
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
