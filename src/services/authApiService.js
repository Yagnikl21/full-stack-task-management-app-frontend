import axios from "axios";
import BASE_URL from "./endpoint"; 

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const apiRequest = async (method, url, data = {}) => {
  
  try {
    const response = await axiosClient({
      method,
      url,
      ...(method === "get" ? { params: data } : { data }),
    });

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data || "An error occurred.",
    };
  }
};

export const authApiService = {
  login: (url, payload) => apiRequest("post", url, payload),
  signup: (url, payload) => apiRequest("post", url, payload),
  forgotPassword: (url, payload) => apiRequest("post", url, payload),
};
