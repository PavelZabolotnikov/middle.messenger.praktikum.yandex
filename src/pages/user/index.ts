export { UserPage } from './user-profile';
export { UserInfoChangePage } from './user-info-change';
export { UserPasswordChangePage } from './user-password-change';

import myPhoto from '../../assets/photo/Bortnikov.png';
import Handlebars from 'handlebars';
Handlebars.registerHelper('userInfo', () => ({
  first_name: 'Александр',
  second_name: 'Бортников',
  display_name: 'BigMan',
  login: 'FSBman',
  email: 'yandex@yandex.ru',
  phone: '8-495-224-22-22',
  photo: myPhoto,
}));
