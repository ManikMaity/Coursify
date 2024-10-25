import axiosInstance from "../helper/axiosInstance";

async function fetchCourseDetailData(courseid) {
  const response = await axiosInstance.get(`/user/courses/${courseid}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });

  return response;
}

export default fetchCourseDetailData;
