import axios from "axios";
import cookie from "js-cookie";

export const fetchCards = deckId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`/api/cards?deck=${deckId}`, config);
};

export const fetchCard = cardId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`/api/cards/${cardId}`, config);
};

export const editCard = card => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.put(`/api/cards/${card._id}`, card, config);
};

export const createCard = params => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post("/api/cards", params, config);
};

export const deleteCard = cardId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.delete(`/api/cards/${cardId}`, config);
};

export const resetCard = cardId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.delete(`/api/cards/${cardId}/review`, config);
};
