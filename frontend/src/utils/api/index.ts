import axios from 'axios';

console.log(333, import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
