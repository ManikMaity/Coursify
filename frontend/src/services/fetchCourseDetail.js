import axiosInstance from "../helper/axiosInstance";

export async function fetchCourseDetail(data) {
        const response = await axiosInstance.post("/admin/courses/ai", data, {
            headers: {
                admintoken: localStorage.getItem("admintoken"),
              },
        });
        return response;
}