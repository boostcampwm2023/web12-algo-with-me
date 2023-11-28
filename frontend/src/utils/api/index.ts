import axios from 'axios';

console.log(333, window.__API_URL__);
const api = axios.create({
  baseURL: window.__API_URL__,
});

export default api;
