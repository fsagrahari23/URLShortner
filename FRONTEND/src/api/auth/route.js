import axiosInstance from "../../utils/axiosInstance";

export const register = async(formData)=>{
  const response = await axiosInstance.post("/api/auth/register",formData,{
     withCredentials: true,
  });
  return response.data;
}


export const login = async(formData)=>{
  const response = await axiosInstance.post("/api/auth/login",formData,{
     withCredentials: true,
  });
  return response.data;
}

export const getCuurentuser = async()=>{
  const response = await axiosInstance.get("/api/auth/me");
  return response.data;
}

export const logOut = async()=>{
  const response = await axiosInstance.get("/api/auth/logout");
  return response.data;
}