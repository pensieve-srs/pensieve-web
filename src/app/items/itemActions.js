import axios from "axios";
import cookie from "js-cookie";

export const fetchItem = itemId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`/api/items/${itemId}`, config);
};

export const editItem = item => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.put(`/api/items/${item._id}`, item, config);
};

export const deleteItem = itemId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.delete(`/api/items/${itemId}`, config);
};

export const resetItem = itemId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post(`/api/items/${itemId}/reset`, {}, config);
};
