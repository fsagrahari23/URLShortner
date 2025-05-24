import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, 
});


axiosInstance.interceptors.response.use(
  (response) => {
  
    return response;
  },
  (error) => {
   
    if (error.response) {
     
      console.error(
        `API Error [${error.response.status}]: ${error.response.data.message || error.message}`
      );
    } else if (error.request) {
     
      console.error("No response from server. Check your network.");
    } else {
     
      console.error("Axios error:", error.message);
    }

  
    return Promise.reject(error);
  }
);

export default axiosInstance;
