import axios from "../../helpers/authAxios";

export const fetchUser = () => {
  return axios.get("/api/users/profile");
};

export const editUser = user => {
  return axios.put("/api/users/profile", user);
};

export const deleteUser = () => {
  return axios.delete("/api/users/profile");
};

export const updatePassword = body => {
  return axios.put("/api/users/profile/security", body);
};
