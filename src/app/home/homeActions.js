import axios from "axios";
import cookie from "js-cookie";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export const fetchReviews = range => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`/api/reviews?range=${range}`, config);
};

export const fetchUserCounts = () => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get("/api/users/profile?fields=counts", config);
};

export const createSession = sessionType => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post("/api/sessions", { type: sessionType }, config);
};
