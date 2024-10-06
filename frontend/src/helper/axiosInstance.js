import axios from "axios";
const axiosInstance = axios.create({
    baseURL : "https://coursify-assignment-api.onrender.com"
})

export default axiosInstance;
