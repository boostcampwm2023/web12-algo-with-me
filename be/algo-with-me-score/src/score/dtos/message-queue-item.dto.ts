export class MessageQueueItemDto {
  constructor(submissionId: number, socketId: string) {
    this.submissionId = submissionId;
    this.socketId = socketId;
  }

  submissionId: number;
  socketId: string;
}
