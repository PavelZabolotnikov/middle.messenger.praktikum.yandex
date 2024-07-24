import Api from '../api';
import { Password, ProfileData } from '../utils/types/profile';

export class UserApi extends Api {
  constructor() {
    super('/user');
  }

  profileEdit = async (data: ProfileData): Promise<Response> => {
    return await this.http.put('/profile', data);
  };

  profileAvatar = async (data: FormData): Promise<Response> => {
    return await this.http.put('/profile/avatar', data);
  };

  changePassword = async (data: Password): Promise<Response> => {
    return await this.http.put('/password', data);
  };
}

export default new UserApi();
