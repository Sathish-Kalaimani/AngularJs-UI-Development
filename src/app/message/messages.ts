export class Message {
  messageId: number;
  message: string;
  senderName: string;
  receiverId: string;
  postedDate: string;
  circleName: string;

  messageArray: object[];

  constructor() {
    this.messageArray = [];
  }

  getMessageArray() {
    return this.messageArray;
  }
}

/*export const MESSAGES = [
 {messageId: 1, message: 'Kings Always Rule', senderId: 'skalaim', receiverId: 'rajeek33'},
];*/
