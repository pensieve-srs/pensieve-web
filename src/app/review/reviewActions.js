import axios from "axios";
import cookie from "js-cookie";

const config = { headers: { Authorization: cookie.get("token") } };

export const fetchSession = sessionId => {
  return axios.get(`/api/sessions/${sessionId}`, config);
};

export const reviewCard = ({ cardId, value }) => {
  return axios.post(`/api/cards/${cardId}/review`, { cardId, value }, config);
};

export const createSession = (sessionType, deckId) => {
  return axios.post("/api/sessions", { type: sessionType, deck: deckId }, config);
};
