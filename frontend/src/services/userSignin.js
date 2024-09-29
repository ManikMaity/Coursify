import axiosInstance from "../helper/axiosInstance";

export default async function userSignin(userData) {
    const response = await axiosInstance.post("/user/login", userData);

    return response;
}