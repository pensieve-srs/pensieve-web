import axios from "axios";
import cookie from "js-cookie";

export const fetchSession = sessionId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`/api/sessions/${sessionId}`, config);
};

export const reviewCard = ({ cardId, value }) => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post(`/api/cards/${cardId}/review`, { cardId, value }, config);
};

export const createSession = (sessionType, deckId) => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post("/api/sessions", { type: sessionType, deck: deckId }, config);
};
