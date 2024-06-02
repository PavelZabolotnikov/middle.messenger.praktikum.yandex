import { AuthApi } from '../api/auth';
import store from '../store/store';
import Router from '../utils/router/Router';
import { SignInData, SignUpData } from '../utils/types/auth';

class AuthController {
  private readonly api: AuthApi;

  constructor() {
    this.api = new AuthApi();
  }

  async signup(data: SignUpData) {
    try {
      await this.api.signup(data);
      Router.go('/messenger');
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async signin(data: SignInData) {
    await this.api.signin(data);
    Router.go('/messenger');
  }

  async logout() {
    try {
      await this.api.logout();
      Router.go('/');
    } catch (error: unknown) {
      console.error(error);
    }
  }

  async getUserData() {
    try {
      const user = await this.api.getUser();
      store.set('user', user);
    } catch (error: unknown) {
      console.error(error);
    }
  }
}

export default new AuthController();
