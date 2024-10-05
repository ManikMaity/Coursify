import axios from "axios";
const axiosInstance = axios.create({
    baseURL : "https://coursify-assignment-backend.vercel.app"
})

export default axiosInstance;