import axios from "axios";

const path = process.env.REACT_APP_SERVER_URL;

export const loginUser = (email, password) => {
  return axios.post(`${path}/api/users/login`, { email, password });
};

export const signupUser = ({ email, password, username, invite }) => {
  return axios.post(`${path}/api/users/signup`, { email, password, username, invite });
};
