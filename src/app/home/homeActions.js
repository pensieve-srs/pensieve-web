import axios from "axios";
import cookie from "js-cookie";

export const fetchStudyTypes = () => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get("/api/study_types", config);
};

export const createSession = sessionType => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post("/api/sessions", { sessionType }, config);
};
