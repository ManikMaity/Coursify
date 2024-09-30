import axiosInstance from "../helper/axiosInstance"

async function fetchAdminCourses() {
  const response = await axiosInstance.get("/admin/courses", {
    headers : {
        admintoken : localStorage.getItem("admintoken")
    }
  })

  return response;
}

export default fetchAdminCourses
