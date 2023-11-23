import axios from 'axios';

const TOKEN_KEY = 'accessToken';

export default function JoinCompetitionButton(props: { id: number }) {
  const apiUrl = import.meta.env.VITE_API_URL;

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);

  const handleJoinClick = async () => {
    if (!token) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      return;
    }

    try {
      await axios.post(`${apiUrl}/competitions/${props.id}/participations`);

      alert('대회에 성공적으로 참여했습니다.');
      window.location.reload();
    } catch (error: unknown) {
      let errorMessage = 'Unexpected error occurred.';

      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 403) {
            errorMessage = '대회 참여에 실패했습니다. 서버에서 거절되었습니다.';
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
  };

  return <button onClick={handleJoinClick}>참여하기</button>;
}
