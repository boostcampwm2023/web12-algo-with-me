import axios from 'axios';

const api = axios.create({
  baseURL: window.__API_URL__,
});

export default api;
