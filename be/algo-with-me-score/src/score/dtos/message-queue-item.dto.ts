export class MessageQueueItemDto {
  constructor(submissionId: number, problemId: number, sessionId: string) {
    this.submissionId = submissionId;
    this.problemId = problemId;
    this.sessionId = sessionId;
  }

  submissionId: number;
  problemId: number;
  sessionId: string;
}
