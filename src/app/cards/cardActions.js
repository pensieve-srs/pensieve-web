import axios from "axios";
import cookie from "js-cookie";

const config = { headers: { Authorization: cookie.get("token") } };

export const fetchCards = deckId => {
  return axios.get(`/api/cards?deck=${deckId}`, config);
};

export const fetchCard = cardId => {
  return axios.get(`/api/cards/${cardId}`, config);
};

export const editCard = card => {
  return axios.put(`/api/cards/${card._id}`, card, config);
};

export const createCard = params => {
  return axios.post("/api/cards", params, config);
};

export const deleteCard = cardId => {
  return axios.delete(`/api/cards/${cardId}`, config);
};

export const resetCard = cardId => {
  return axios.delete(`/api/cards/${cardId}/review`, config);
};
