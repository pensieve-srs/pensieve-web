import axios from "axios";
import cookie from "js-cookie";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export const fetchDecks = () => {
  const config: Headers = { headers: { Authorization: cookie.get("token") } };

  return axios.get("/api/decks", config);
};

export const fetchDeck = deckId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`/api/decks/${deckId}`, config);
};

export const editDeck = deck => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.put(`/api/decks/${deck._id}`, deck, config);
};

export const createDeck = params => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post("/api/decks", params, config);
};

export const resetDeck = deckId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.delete(`/api/decks/${deckId}/review`, config);
};

export const studyDeck = deckId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post(`/api/sessions`, { deck: deckId, type: "deck" }, config);
};

export const deleteDeck = deckId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.delete(`/api/decks/${deckId}`, config);
};
