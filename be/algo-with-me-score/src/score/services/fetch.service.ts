import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { ScoreResultDto } from '../dtos/score-result.dto';
import ICoderunResponse from '../interfaces/coderun-response.interface';

@Injectable()
export class FetchService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  async sendScoreResultToApiServer(scoreResult: ScoreResultDto) {
    const [apiServerHost, apiServerPort] = [
      process.env.API_SERVER_HOST,
      process.env.API_SERVER_PORT,
    ];
    const url = `http://${apiServerHost}:${apiServerPort}/competitions/scores`;
    this.logger.debug(`API 서버에게 보내는 채점 결과: ${JSON.stringify(scoreResult)}`);
    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreResult),
      });
      this.logger.debug(`API 서버 status code: ${result.status}`);
    } catch (error) {
      this.logger.error(
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
    containerId: number,
  ): Promise<ICoderunResponse> {
    const [dockerServerHost, dockerServerBasePort] = [
      process.env.DOCKER_SERVER_HOST,
      process.env.DOCKER_SERVER_PORT,
    ];
    const dockerServerPort = (parseInt(dockerServerBasePort) + containerId).toString();
    const url = `http://${dockerServerHost}:${dockerServerPort}/${competitionId}/${userId}/${problemId}/${testcaseId}`;
    try {
      const response = await fetch(url, { method: 'POST' });
      return (await response.json()) as ICoderunResponse;
    } catch (error) {
      this.logger.error(
        `도커 서버로 채점 요청을 보내는 데 실패했습니다 (POST ${url}) 원인: ${error}`,
      );
      throw new InternalServerErrorException();
    }
  }
}
