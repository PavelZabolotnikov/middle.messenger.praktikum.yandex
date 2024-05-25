import { MessengerApi } from '../api/messenger';
import store from '../store/store';

class UserController {
  private readonly api: MessengerApi;
  constructor() {
    this.api = new MessengerApi();
  }

  async getChats() {
    try {
      const chat = await this.api.getChats();
      store.set('chats', chat);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async createChat(data: unknown) {
    try {
      await this.api.createNewChat(data);
      this.getChats();
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async deleteChat(id: { chatId: number }) {
    try {
      await this.api.deleteChat(id);
      this.getChats();
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async addUserToChat(data: { users: number[]; chatId: number }) {
    try {
      await this.api.addUserToChat(data);
      this.getChats();
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async removeUserFromChat(data: { users: number[]; chatId: number }) {
    try {
      await this.api.removeUserFromChat(data);
      this.getChats();
    } catch (error: unknown) {
      console.error(error);
    }
  }
  getWSToken(id: number) {
    return this.api.getToken(id);
  }
}

export default new UserController();