import axios from "../../helpers/authAxios";

export const fetchDecks = () => {
  return axios.get("/api/decks");
};

export const fetchDeck = deckId => {
  return axios.get(`/api/decks/${deckId}`);
};

export const editDeck = deck => {
  return axios.put(`/api/decks/${deck._id}`, deck);
};

export const createDeck = params => {
  return axios.post("/api/decks", params);
};

export const resetDeck = deckId => {
  return axios.delete(`/api/decks/${deckId}/review`);
};

export const studyDeck = deckId => {
  return axios.post(`/api/sessions`, { deck: deckId, type: "deck" });
};

export const deleteDeck = deckId => {
  return axios.delete(`/api/decks/${deckId}`);
};
