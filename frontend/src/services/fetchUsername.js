import axiosInstance from "../helper/axiosInstance"

async function fetchUsername() {
  const response = await axiosInstance.get("/user", {
    headers : {
        token : localStorage.getItem("token")
    }
  });
  return response;
}

export default fetchUsername
