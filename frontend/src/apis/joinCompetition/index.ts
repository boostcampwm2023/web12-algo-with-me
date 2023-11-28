import api from '@/utils/api';

import type { CompetitionApiData } from './types';
import axios from 'axios';

const STATUS = {
  Forbidden: 403,
  BadRequest: 400,
} as const;

export async function joinCompetition(data: CompetitionApiData) {
  const { id, token } = data;

  try {
    await api.post(
      `/competitions/${id}/participations`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return '대회에 성공적으로 참여했습니다.';
  } catch (error: unknown) {
    let errorMessage = 'Unexpected error occurred.';

    if (!axios.isAxiosError(error)) {
      return 'Unexpected error occurred';
    }

    if (!error.response) {
      return 'Network error occurred';
    }

    switch (error.response.status) {
      case STATUS.Forbidden:
        errorMessage = '대회 참여에 실패했습니다. 서버에서 거절되었습니다.';
        break;
      case STATUS.BadRequest:
        errorMessage = '이미 참여한 대회입니다.';
        break;
      default:
        errorMessage = `HTTP Error ${error.response.status}`;
        break;
    }

    return errorMessage;
  }
}
