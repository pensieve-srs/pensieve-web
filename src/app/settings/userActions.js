import axios from "axios";
import cookie from "js-cookie";

const config = { headers: { Authorization: cookie.get("token") } };

export const fetchUser = () => {
  return axios.get("/api/users/profile", config);
};

export const editUser = user => {
  return axios.put("/api/users/profile", user, config);
};

export const deleteUser = () => {
  return axios.delete("/api/users/profile", config);
};

export const updatePassword = body => {
  return axios.put("/api/users/profile/security", body, config);
};
