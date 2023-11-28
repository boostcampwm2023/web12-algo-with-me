import api from '@/utils/api';

import { Competition } from './types';

export const fetchCompetitionList = async (): Promise<Competition[]> => {
  try {
    const response = await api.get('/competitions');
    return response.data;
  } catch (error) {
    console.error('Error fetching competitions:', (error as Error).message);
    throw error;
  }
};
