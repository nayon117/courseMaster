import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:5000/api",
//   baseURL: "https://course-master-backend-one.vercel.app/api",
  withCredentials: true,
});

export default axiosPublic;
