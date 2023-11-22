import type { ProblemInfo } from './types';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export * from './types';

export async function fetchProblemList() {
  try {
    const { data } = await api.get<ProblemInfo[]>('/problems');

    return data;
  } catch (err) {
    console.error(err);

    return [];
  }
}
