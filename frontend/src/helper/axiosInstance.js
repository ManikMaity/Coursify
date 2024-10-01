import axios from "axios";
const axiosInstance = axios.create({
    baseURL : "https://coursify-assignment-server.onrender.com"
})

export default axiosInstance;
