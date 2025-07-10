import axios from "axios";

const BASE_URL = "https://incentive-traker-backend.onrender.com"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // optional: if you're using cookies/session-based auth
});

export default axiosInstance
