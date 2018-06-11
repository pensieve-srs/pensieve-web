import axios from "axios";
import cookie from "js-cookie";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
const config = { headers: { Authorization: cookie.get("token") } };

export const fetchDecks = () => {
  return axios.get("/api/decks", config);
};

export const fetchDeck = deckId => {
  return axios.get(`/api/decks/${deckId}`, config);
};

export const editDeck = deck => {
  return axios.put(`/api/decks/${deck._id}`, deck, config);
};

export const createDeck = params => {
  return axios.post("/api/decks", params, config);
};

export const resetDeck = deckId => {
  return axios.delete(`/api/decks/${deckId}/review`, config);
};

export const studyDeck = deckId => {
  return axios.post(`/api/sessions`, { deck: deckId, type: "deck" }, config);
};

export const deleteDeck = deckId => {
  return axios.delete(`/api/decks/${deckId}`, config);
};
