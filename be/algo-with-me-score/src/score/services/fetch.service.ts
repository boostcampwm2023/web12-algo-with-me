import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { ScoreResultDto } from '../dtos/score-result.dto';
import ICoderunResponse from '../interfaces/coderun-response.interface';

@Injectable()
export class FetchService {
  constructor() {}

  async sendScoreResultToApiServer(scoreResult: ScoreResultDto) {
    const [apiServerHost, apiServerPort] = [
      process.env.API_SERVER_HOST,
      process.env.API_SERVER_PORT,
    ];
    const url = `http://${apiServerHost}:${apiServerPort}/competitions/scores`;
    console.log(JSON.stringify(scoreResult));
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreResult),
      });
      console.log(result.status);
    } catch (error) {
      new Logger().error(
        `API 서버로 채점 결과를 보내는 데 실패했습니다 (POST ${url}) 원인: ${error}`,
      );
      throw new InternalServerErrorException();
    }
  }

  async requestDockerServerToRunCode(
    competitionId: number,
    userId: number,
    problemId: number,
    testcaseId: number,
  ): Promise<ICoderunResponse> {
    const [dockerServerHost, dockerServerPort] = [
      process.env.DOCKER_SERVER_HOST,
      process.env.DOCKER_SERVER_PORT,
    ];
    const url = `http://${dockerServerHost}:${dockerServerPort}/${competitionId}/${userId}/${problemId}/${testcaseId}`;
    try {
      const response = await fetch(url, { method: 'POST' });
      return (await response.json()) as ICoderunResponse;
    } catch (error) {
      new Logger().error(
        `도커 서버로 채점 요청을 보내는 데 실패했습니다 (POST ${url}) 원인: ${error}`,
      );
      throw new InternalServerErrorException();
    }
  }
}
