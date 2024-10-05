import axiosInstance from "../helper/axiosInstance"

async function fetchPlaylistData(url) {
    const response = await axiosInstance.get(`/admin/courses/yt?url=${url}`, {
        headers: {
            admintoken: localStorage.getItem("admintoken"),
        },
    })
    
    return response;
}

export default fetchPlaylistData
