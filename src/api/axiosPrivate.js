import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:5000/api",
//   baseURL: "https://course-master-backend-one.vercel.app/api",
  withCredentials: true, 
});

axiosPrivate.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token"); 
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

export default axiosPrivate;
