import axios from "axios";
import cookie from "js-cookie";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

export const fetchActivity = ({ deck }) => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get(`/api/activity?deck=${deck._id}`, config);
};
