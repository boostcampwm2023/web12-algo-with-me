interface Testcase {
  id: number;
  input: string;
  expected: string;
  changable: boolean;
}

export const pushHiddenCases = (
  currentProblemIndex: number,
  extendedTestcases: Testcase[],
): Testcase[] => {
  const result: Testcase[] = [...extendedTestcases];

  switch (currentProblemIndex) {
    case 0:
      result.push(
        {
          id: 4,
          input: '1,2',
          expected: '3',
          changable: false,
        },
        {
          id: 5,
          input: '-94879,-25348',
          expected: '-120227',
          changable: false,
        },
        {
          id: 6,
          input: '3,0',
          expected: '3',
          changable: false,
        },
        {
          id: 7,
          input: '0,-5',
          expected: '-5',
          changable: false,
        },
        {
          id: 8,
          input: '-1,-1',
          expected: '-2',
          changable: false,
        },
        {
          id: 9,
          input: '63840,24823',
          expected: '88663',
          changable: false,
        },
        {
          id: 10,
          input: '-99999,-99999',
          expected: '-199998',
          changable: false,
        },
      );
      break;
    case 1:
      result.push(
        {
          id: 4,
          input: '1000000000,999999999,1000000000',
          expected: '1',
          changable: false,
        },
        {
          id: 5,
          input: '3,2,4',
          expected: '2',
          changable: false,
        },
        {
          id: 6,
          input: '100,97,1000000000',
          expected: '333333301',
          changable: false,
        },
        {
          id: 7,
          input: '5,1,11',
          expected: '3',
          changable: false,
        },
        {
          id: 8,
          input: '10,3,23',
          expected: '3',
          changable: false,
        },
        {
          id: 9,
          input: '100,1,9900',
          expected: '100',
          changable: false,
        },
        {
          id: 10,
          input: '5,2,10',
          expected: '3',
          changable: false,
        },
      );
      break;
    case 2:
      result.push(
        {
          id: 4,
          input: '13,27',
          expected: '317578',
          changable: false,
        },
        {
          id: 5,
          input: '9,17',
          expected: '2550',
          changable: false,
        },
        {
          id: 6,
          input: '11,23',
          expected: '46279',
          changable: false,
        },
        {
          id: 7,
          input: '6,28',
          expected: '514221',
          changable: false,
        },
        {
          id: 8,
          input: '12,29',
          expected: '831896',
          changable: false,
        },
        {
          id: 9,
          input: '8,24',
          expected: '75004',
          changable: false,
        },
        {
          id: 10,
          input: '29,30',
          expected: '832040',
          changable: false,
        },
      );
      break;

    default:
      break;
  }

  return result;
};
