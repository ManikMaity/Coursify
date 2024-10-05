import axiosInstance from "../helper/axiosInstance"

async function fetchCourseData(id) {
    const response = await axiosInstance.get(`user/watch/${id}`, {
        headers : {
            token : localStorage.getItem("token")
        }
    })

    return response;
}

export default fetchCourseData
