export type CompetitionApiData = {
  id: number;
  token: string | null;
};

export type FetchIsCompetitionJoinableResponse = {
  isJoinable: boolean;
  message: string;
};
