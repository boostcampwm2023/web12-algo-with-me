interface ICoderunResponse {
  result: 'SUCCESS' | string;
  competitionId: number;
  userId: number;
  problemId: number;
}

export default ICoderunResponse;
