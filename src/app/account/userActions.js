import axios from "axios";
import cookie from "js-cookie";

export const fetchUser = () => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.get("/api/users/profile", config);
};

export const editUser = user => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.put("/api/users/profile", user, config);
};

export const deleteUser = () => {
  const config = { headers: { Authorization: cookie.get("token") } };

  return axios.delete("/api/users/profile", config);
};
