import axiosInstance from "../helper/axiosInstance";

export default async function fetchAllCources() {
  const token = localStorage.getItem("token");
  const response = await axiosInstance.get("/user/courses", {
    headers: {
      token,
    },
  });
  return response;
}
