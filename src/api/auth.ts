import Api from '../api';
import { SignInData, SignUpData, User } from '../utils/types/auth';

export class AuthApi extends Api {
  constructor() {
    super('/auth');
  }
//@ts-expect-error обход обработки дефолтной ошибки
  signin = async (data: SignInData): Promise<Response> => {
    try {
      return await this.http.post('/signin', data);
    } catch (error) {
//@ts-expect-error мы знаем, что придет reason
      if(error && error.reason === 'User already in system') {
        console.log('Allready signed')
      } else {
       
      console.error('Error signing in', error)
      throw error
    }

    }
  };

  signup = async (data: SignUpData): Promise<Response> => {
    return await this.http.post('/signup', data);
  };

  getUser = async (): Promise<User> => {
    return await this.http.get('/user');
  };

  logout = async (): Promise<void> => {
    await this.http.post('/logout');
  };
}

export default new AuthApi();
