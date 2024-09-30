import axiosInstance from "../helper/axiosInstance"

async function fetchAdminData() {
  const response = await axiosInstance.get("/admin/me", {
    headers : {
        admintoken : localStorage.getItem("admintoken")
    }
  })

  return response;
}

export default fetchAdminData
