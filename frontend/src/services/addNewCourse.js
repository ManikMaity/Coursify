import axiosInstance from "../helper/axiosInstance";

async function addNewCourse(courseData) {
  const response = await axiosInstance.post("/admin/courses/add", courseData, {
    headers: {
      admintoken: localStorage.getItem("admintoken"),
    },
  });

  return response;
}

export default addNewCourse;
