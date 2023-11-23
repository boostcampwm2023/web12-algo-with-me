import type { CompetitionApiData } from './types';
import axios from 'axios';

export async function joinCompetition(data: CompetitionApiData) {
  const { apiUrl, id, token } = data;

  try {
    await axios.post(
      `${apiUrl}/competitions/${id}/participations`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    alert('대회에 성공적으로 참여했습니다.');
    window.location.reload();
  } catch (error: unknown) {
    let errorMessage = 'Unexpected error occurred.';

    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 403) {
          errorMessage = '대회 참여에 실패했습니다. 서버에서 거절되었습니다.';
        } else if (error.response.status === 400) {
          errorMessage = '이미 참여한 대회입니다.';
        } else {
          errorMessage = `HTTP Error ${error.response.status}`;
        }
      } else {
        errorMessage = 'Network error occurred.';
      }
    }

    alert(errorMessage);
    window.location.reload();
  }
}
