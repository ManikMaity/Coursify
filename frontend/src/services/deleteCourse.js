import axiosInstance from "../helper/axiosInstance"

async function deleteCourse(courseId) {
  const response = await axiosInstance.delete("/admin/courses/delete/" + courseId, {
    headers : {
      admintoken : localStorage.getItem("admintoken")
    }
  })

  return response
}

export default deleteCourse
