import { CompetitionId } from '@/apis/competitions';
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
    if (!axios.isAxiosError(error)) {
      return 'Unexpected error occurred';
    }

    if (!error.response) {
      return 'Network error occurred';
    }

    switch (error.response.status) {
      case STATUS.Forbidden:
        return '대회 참여에 실패했습니다. 서버에서 거절되었습니다.';
      case STATUS.BadRequest:
        return '이미 참여한 대회입니다.';
      default:
        return `HTTP Error ${error.response.status}`;
    }
  }
}

export async function fetchIsJoinableCompetition(
  competitionId: CompetitionId,
  token: string,
): Promise<boolean> {
  try {
    const { data } = await api.get(`/competitions/validation/${competitionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.isJoinable;
  } catch (err) {
    return false;
  }
}
