import axios from "axios";

const BASE_URL = 'http://localhost:8000'; 

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // optional: if you're using cookies/session-based auth
});

export default axiosInstance