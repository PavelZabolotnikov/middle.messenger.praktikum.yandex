import Api from '../api';

interface ChatUsers {
  users: number[];
  chatId: number;
}
interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
}
export class MessengerApi extends Api {
  constructor() {
    super('/chats');
  }

  getChats = async (): Promise<Chat[]> => {
    return await this.http.get('');
  };
  createNewChat = async (data: unknown): Promise<Response> => {
    return await this.http.post('', data);
  };
  deleteChat = async (id: { chatId: number }): Promise<Response> => {
    return await this.http.delete('', id);
  };
  addUserToChat = async (data: ChatUsers): Promise<Response> => {
    return await this.http.put('/users', data);
  };
  removeUserFromChat = async (data: ChatUsers): Promise<Response> => {
    return await this.http.delete('/users', data);
  };
  getToken = async (id: number): Promise<{ token: string }> => {
    return await this.http.post(`/token/${id}`);
  };
}

export default new MessengerApi();
