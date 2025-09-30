import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8086/api/aiome", // Ajusta el puerto si tu backend corre en otro
});

export default api;
