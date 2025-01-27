const BASE_URL = "https://full-stack-task-management-app-an61.onrender.com/api"; // Define your API base URL here

export const endpoints = {
  LOGIN: `${BASE_URL}/auth/login`,  
  GET_ITEMS: `${BASE_URL}/menu`,
  ADD_ITEMS: `${BASE_URL}/menu`,
  EDIT_ITEM: `${BASE_URL}/menu`,
  ORDER_HISTORY : `${BASE_URL}/order/history`,
  PLACE_ORDER : `${BASE_URL}/order/place`,
};

export default BASE_URL;
