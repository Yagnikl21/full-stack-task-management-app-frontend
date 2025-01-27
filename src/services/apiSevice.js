import axios from "axios";
import BASE_URL from "./endpoint";

const axiosClient = axios.create({
   baseURL: BASE_URL,
   headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
   },
});

// handle unauthenticated users
const handleUnauthorized = (navigate) => {
   localStorage.removeItem("token");
   navigate("/login");
};

const apiRequest = async (method, url, data = {}, navigate) => {
   try {
      const token = localStorage.getItem("token");
      const headers = token
         ? { Authorization: `Bearer ${token}` } 
         : {};

      const response = await axiosClient({
         method,
         url,
         ...(method === "get" ? { params: data } : { data }),
         headers,
      });

      return { success: true, data: response.data };
   } catch (error) {
      const status = error?.response?.status;

      if (status === 401) {
         handleUnauthorized(navigate);
      }

      return {
         success: false,
         error: error?.response?.data || "An error occurred.",
      };
   }
};

export const api = {
   get: (url, params = {}, navigate) =>
      apiRequest("get", url, params, navigate),
   post: (url, payload = {}, navigate) =>
      apiRequest("post", url, payload, navigate),
   patch: (url, payload = {}, navigate) =>
      apiRequest("patch", url, payload, navigate),
   delete: (url, params = {}, navigate) =>
      apiRequest("delete", url, params, navigate),
};
