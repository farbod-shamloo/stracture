import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API;
const DARGAH_URL = import.meta.env.VITE_APP_DARGAH;

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      'خطایی رخ داده است';

    switch (status) {
      case 401:
        window.location.href = DARGAH_URL;
        break;

      case 403:
        window.location.href = '/error?errorCode=403';
        break;

      case 500:
        window.location.href = '/error?errorCode=500';
        break;

      case 404:
        window.location.href = '/*';
        break;

      default:
        console.error('Unhandled error:', status, message);
        break;
    }

    return Promise.reject(error);
  }
);

export default api;
