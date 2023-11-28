import api from '@/utils/api';

import { Competition } from './types';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchCompetitionList = async (): Promise<Competition[]> => {
  try {
    const response = await api.get<Competition[]>(`${apiUrl}competitions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching competitions:', (error as Error).message);
    throw error;
  }
};
