import axios from "axios";
import cookie from "js-cookie";

export const fetchItems = deckId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`/api/cards?deck=${deckId}`, config);
};

export const fetchItem = itemId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`/api/cards/${itemId}`, config);
};

export const editItem = item => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.put(`/api/cards/${item._id}`, item, config);
};

export const createItem = params => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post("/api/cards", params, config);
};

export const deleteItem = itemId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.delete(`/api/cards/${itemId}`, config);
};

export const resetItem = itemId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.delete(`/api/cards/${itemId}/review`, config);
};
