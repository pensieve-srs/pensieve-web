import axios from "axios";
import cookie from "js-cookie";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export const getTags = () => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get("/api/tags", config);
};

export const createTag = value => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.post("/api/tags", { value }, config);
};
