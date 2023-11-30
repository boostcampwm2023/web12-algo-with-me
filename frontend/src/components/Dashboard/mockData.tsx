import { CompetitionId } from '@/apis/competitions';

type Rank = {
  email: string;
  score: number;
  problemDict: {
    [key: number]: number | null;
  };
};

type Dashboard = {
  competitionId: CompetitionId;
  totalProblemCount: number;
  rankings: Rank[];
};

const generateRandomProblemDict = () => {
  const problemDict: Record<string, number | null> = {};
  for (let i = 1; i <= 5; i++) {
    problemDict[i] = Math.floor(Math.random() * 10); // 임의의 정수 값 생성
  }
  return problemDict;
};

export default function generateMockData() {
  const data: Dashboard = {
    competitionId: 1,
    totalProblemCount: 5,
    rankings: [],
  };

  for (let i = 0; i < 20; i++) {
    const rank: Rank = {
      email: `participant${i + 1}@example.com`,
      score: Math.floor(Math.random() * 1000000) + 1, // +1을 추가하여 0보다 큰 값으로 만듦
      problemDict: generateRandomProblemDict(),
    };

    data.rankings.push(rank);
  }

  // score를 기준으로 내림차순 정렬
  data.rankings.sort((a, b) => b.score - a.score);

  return data;
}
