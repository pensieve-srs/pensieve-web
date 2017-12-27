import axios from "axios";
import cookie from "js-cookie";

const path = process.env.REACT_APP_SERVER_URL;

export const fetchStudyTypes = () => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`${path}/api/study_types`, config);
};

export const createSession = sessionType => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post("/api/sessions", { sessionType }, config);
};
