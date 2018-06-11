import axios from "axios";

export const loginUser = (email, password) => {
  return axios.post(`/api/users/login`, { email, password });
};

export const signupUser = ({ email, password, name, invite }) => {
  return axios.post(`/api/users/signup`, { email, password, name, invite });
};
