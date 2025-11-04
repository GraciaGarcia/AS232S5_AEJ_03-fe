import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8086/api/aiome",
  timeout: 10000,
});

export default API;
