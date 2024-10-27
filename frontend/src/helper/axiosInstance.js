import axios from "axios";
const axiosInstance = axios.create({
    baseURL : "https://coursify-assignment-api.onrender.com"
    // baseURL : "http://localhost:3000"
})

export default axiosInstance;
