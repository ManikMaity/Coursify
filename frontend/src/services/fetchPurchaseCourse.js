import axiosInstance from "../helper/axiosInstance";

async function fetchPurchaseCourse() {
  const response = await axiosInstance.get("/user/purchasedCourses", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  return response;
}

export default fetchPurchaseCourse;
