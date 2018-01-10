import axios from "axios";
import cookie from "js-cookie";

export const fetchSession = sessionId => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`/api/sessions/${sessionId}`, config);
};

export const reviewItem = ({ itemId, value }) => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post(`/api/cards/${itemId}/review`, { itemId, value }, config);
};
