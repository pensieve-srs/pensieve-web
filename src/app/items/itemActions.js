import axios from "axios";
import cookie from "js-cookie";

export const fetchItems = deckId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`/api/cards?deck=${deckId}`, config);
};

export const fetchItem = cardId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`/api/cards/${cardId}`, config);
};

export const editItem = card => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.put(`/api/cards/${card._id}`, card, config);
};

export const createItem = params => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post("/api/cards", params, config);
};

export const deleteItem = cardId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.delete(`/api/cards/${cardId}`, config);
};

export const resetItem = cardId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.delete(`/api/cards/${cardId}/review`, config);
};
