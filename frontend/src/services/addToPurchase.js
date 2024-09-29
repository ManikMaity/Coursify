import axiosInstance from "../helper/axiosInstance"

async function addToPurchase(courseId) {
    const response = await axiosInstance.post(`/user/courses/${courseId}`, {}, {
        headers : {
            token : localStorage.getItem("token")
        }
    });
    return response
}

export default addToPurchase
