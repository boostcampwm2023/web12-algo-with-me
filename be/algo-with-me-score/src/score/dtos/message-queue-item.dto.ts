export class MessageQueueItemDto {
  constructor(submissionId: number, sessionId: string) {
    this.submissionId = submissionId;
    this.sessionId = sessionId;
  }

  submissionId: number;
  sessionId: string;
}
