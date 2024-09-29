import axiosInstance from "../helper/axiosInstance"

async function userRegister(userData) {
  const response = await axiosInstance.post("/user/signup", userData);
  return response;
}

export default userRegister
