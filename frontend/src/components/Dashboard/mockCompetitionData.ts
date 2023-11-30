export type mockCompetitionDataProps = {
  userList: Record<
    string,
    {
      'Solved Problems': number;
      'Total Time Spent': number;
      Problems: Record<string, number | null>;
    }
  >;
};

export const mockCompetitionData: mockCompetitionDataProps['userList'] = {
  'tmp@gmail.com': {
    'Solved Problems': 2,
    'Total Time Spent': 19,
    // eslint-disable-next-line quote-props
    Problems: {
      1: 12,
      2: null,
      4: 7,
    },
  },
  'user2@gmail.com': {
    'Solved Problems': 0,
    'Total Time Spent': 0,
    // eslint-disable-next-line quote-props
    Problems: {
      1: null,
      2: null,
      4: null,
    },
  },
};
