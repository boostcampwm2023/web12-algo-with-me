export class ScoreResultDto {
  constructor(
    submissionId: number,
    testcaseId: number,
    socketId: string,
    result: '처리중' | '정답입니다' | '오답입니다' | '시간초과' | '메모리초과',
    stdout: string,
    stderr: string,
    timeUsage: number,
    memoryUsage: number,
  ) {
    this.submissionId = submissionId;
    this.testcaseId = testcaseId;
    this.socketId = socketId;
    this.result = result;
    this.stdout = stdout;
    this.stderr = stderr;
    this.timeUsage = timeUsage;
    this.memoryUsage = memoryUsage;
  }

  submissionId: number;
  testcaseId: number;
  socketId: string;
  result: '처리중' | '정답입니다' | '오답입니다' | '시간초과' | '메모리초과';
  stdout: string;
  stderr: string;
  timeUsage: number;
  memoryUsage: number;
}
