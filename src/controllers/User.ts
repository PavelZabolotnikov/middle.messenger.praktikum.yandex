import { UserApi } from '../api/user';
import store from '../store/store';
import { Password, ProfileData } from '../utils/types/profile';

class UserController {
  private readonly api: UserApi;

  constructor() {
    this.api = new UserApi();
  }

  async putUserData(data: ProfileData) {
    try {
      const user = await this.api.profileEdit(data);
      store.set('user', user);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async putUserAvatar(data: FormData) {
    try {
      const user = await this.api.profileAvatar(data);
      store.set('user', user);
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async changePassword(data: Password) {
    try {
      await this.api.changePassword(data);
    } catch (error: unknown) {
      console.error(error);
    }
  }
}

export default new UserController();