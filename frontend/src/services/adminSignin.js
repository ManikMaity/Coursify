import axiosInstance from "../helper/axiosInstance";

async function adminSignin(adminData) {
  const response = await axiosInstance.post("/admin/login", adminData);
  return response;
}

export default adminSignin;
