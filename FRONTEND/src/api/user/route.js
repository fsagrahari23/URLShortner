import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

export const getAllShortUrls = async(url)=>{
    const response = await axiosInstance.get('/api/user/all');
    return response.data;
}