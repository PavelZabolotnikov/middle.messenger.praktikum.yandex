export { UserPage } from './user-profile';
export { UserInfoChangePage } from './user-info-change';
export { UserPasswordChangePage } from './user-password-change';

import myPhoto from '../../assets/photo/Bortnikov.png';
import Handlebars from 'handlebars';
Handlebars.registerHelper('userInfo', () => ({
  photo: myPhoto,
  email: 'yandex@yandex.ru',
  login: 'FSBman',
  second_name: 'Бортников',
  first_name: 'Александр',
  chat_name: 'BigMan',
  phone_number: '8-495-224-22-22',
}));
