import axios from "axios";
// api的基础url
const BASE_URL = "https://api.example.com";

const getClientById = (id) => {
  return axios.get(`${BASE_URL}/users/${id}`);
};

const createUser = (data) => {
  return axios.post(`${BASE_URL}/users`, data);
};

export default {
  getClientById,
  createUser,
};
