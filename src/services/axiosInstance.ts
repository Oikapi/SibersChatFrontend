import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  withCredentials: true, 
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken');
    console.log(token);
    if (token) {
        console.log('Token found:', token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
