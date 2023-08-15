export interface IMessage {
  id: string;
  type: 'bot' | 'user';
  message: string;
}
