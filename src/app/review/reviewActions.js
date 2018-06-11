import axios from "../../helpers/authAxios";

export const fetchSession = sessionId => {
  return axios.get(`/api/sessions/${sessionId}`);
};

export const reviewCard = ({ cardId, value }) => {
  return axios.post(`/api/cards/${cardId}/review`, { cardId, value });
};

export const createSession = (sessionType, deckId) => {
  return axios.post("/api/sessions", { type: sessionType, deck: deckId });
};
