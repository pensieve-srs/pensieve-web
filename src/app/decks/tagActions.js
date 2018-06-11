import axios from "../../helpers/authAxios";

export const getTags = () => {
  return axios.get("/api/tags");
};

export const createTag = value => {
  return axios.post("/api/tags", { value });
};
