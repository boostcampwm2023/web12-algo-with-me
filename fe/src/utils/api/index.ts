import axios, { type AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/',
});

export default api;
export { AxiosError as NetworkError };
