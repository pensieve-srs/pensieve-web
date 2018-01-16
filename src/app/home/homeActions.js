import axios from "axios";
import cookie from "js-cookie";

const path = process.env.REACT_APP_SERVER_URL;

export const fetchDueCards = () => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`${path}/api/cards?type=due`, config);
};

export const fetchNewCards = () => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`${path}/api/cards?type=learn`, config);
};

export const createSession = sessionType => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post("/api/sessions", { type: sessionType }, config);
};
