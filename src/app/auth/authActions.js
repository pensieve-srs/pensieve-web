import axios from "axios";

export const loginUser = (email, password) => {
  return axios.post("/api/users/login", { email, password });
};

export const signupUser = ({ email, password, name, invite }) => {
  return axios.post("/api/users/signup", { email, password, name, invite });
};

export const resetPassword = ({ token, newPassword, verifyPassword }) => {
  const config = { headers: { Authorization: token } };

  return axios.post("/api/users/reset_password", { newPassword, verifyPassword }, config);
};
