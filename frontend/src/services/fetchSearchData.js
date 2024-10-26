import axiosInstance from "../helper/axiosInstance";

async function fetchSearchData(query, data) {
    const response = await axiosInstance.post(`/user/search?q=${query}`, data, {
        headers: {
            token : localStorage.getItem("token")
        }
    });
    return response;
}

export default fetchSearchData;