import axiosInstance from "../helper/axiosInstance";

async function updateCourse(updatedCourseData) {
  const response = await axiosInstance.put(
    `/admin/courses/${updatedCourseData.id}`,
    updatedCourseData,
    {
      headers: {
        admintoken: localStorage.getItem("admintoken"),
      },
    }
  );
  return response;
}

export default updateCourse;
