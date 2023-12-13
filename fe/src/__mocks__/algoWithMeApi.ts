import algoWithMeApiData from '@/__mocks__/algoWithMeApiData.json';

import { delay, http, HttpResponse } from 'msw';

interface PostLoginReqBody {
  testcaseId: string;
  solutionCode: string;
}

export const algoWithMeApi = [
  // TODO API url을 어떻게 설정할 지 다음주에 백엔드와 논의 필요.
  http.post<PostLoginReqBody>('/algo-with-me-api', async ({ request }) => {
    const { solutionCode, testcaseId } = (await request.json()) as PostLoginReqBody;
    // 아래 로직은 websocket을 msw로 구현하는 것이 어렵거나 불가능해서 임시로 넣은 로직
    // client가 testcaseId에 해당하는 값을 post로 보내면
    // msw로 랜덤한 delay를 준 후에 response로 해당 testcaseId에 해당하는 mockSolutionResult를 보내줌

    // 해당 테스트 케이스에 대한 정답 여부
    const filterData = algoWithMeApiData.find((result) => result.testcaseId === Number(testcaseId));
    const delayTime = Math.floor(Math.random() * 10000);

    console.log(solutionCode, '해당 코드 푸는 중...');
    await delay(delayTime);
    return HttpResponse.json(filterData);
  }),
];
