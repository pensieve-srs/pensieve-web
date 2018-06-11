import axios from "../../helpers/authAxios";

export const fetchCards = deckId => {
  return axios.get(`/api/cards?deck=${deckId}`);
};

export const fetchCard = cardId => {
  return axios.get(`/api/cards/${cardId}`);
};

export const editCard = card => {
  return axios.put(`/api/cards/${card._id}`, card);
};

export const createCard = params => {
  return axios.post("/api/cards", params);
};

export const deleteCard = cardId => {
  return axios.delete(`/api/cards/${cardId}`);
};

export const resetCard = cardId => {
  return axios.delete(`/api/cards/${cardId}/review`);
};
