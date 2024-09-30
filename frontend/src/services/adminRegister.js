import axiosInstance from "../helper/axiosInstance";

async function adminRegister(adminData) {
    const response = await axiosInstance.post("/admin/signup", adminData);
    return response;
}

export default adminRegister
