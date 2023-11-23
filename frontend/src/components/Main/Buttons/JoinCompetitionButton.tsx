import axios from 'axios';

export default function JoinCompetitionButton(props: { id: number }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleJoinClick = async () => {
    try {
      await axios.post(`${apiUrl}/competitions/${props.id}`);

      alert('대회에 성공적으로 참여했습니다.');
      window.location.reload();
    } catch (error: unknown) {
      console.error('Error joining competition:', error);

      if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
        alert('대회 참여에 실패했습니다. 서버에서 거절되었습니다.');
        window.location.reload();
      } else {
        console.error('Unexpected error:', error);
      }
    }
  };

  return <button onClick={handleJoinClick}>참여하기</button>;
}
