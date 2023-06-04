import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:44362",
});

export default api;