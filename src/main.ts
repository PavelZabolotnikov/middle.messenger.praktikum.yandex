import * as Pages from './pages';
import router from '../src/utils/router/Router';

enum Links {
  LoginPage = '/',
  RegistrationPage = '/sign-up',
  ChatPage = '/messenger',
  UserPage = '/settings',
  UserInfoChangePage = '/userInfoChangePage',
  UserPasswordChangePage = '/userPasswordChangePage',
  ClientErrorPage = '/404Page',
  ServerErrorPage = '/500Page',
}

router
  .use(Links.LoginPage, () => new Pages.LoginPage({ name: 'login' }))
  .use(Links.RegistrationPage, () => new Pages.RegistrationPage({ name: 'registration' }))
  .use(Links.ChatPage, () => new Pages.ChatPage({ name: 'Chat' }))
  .use(Links.UserPage, () => new Pages.UserPage({ name: 'Profile' }))
  .use(Links.UserInfoChangePage, () => new Pages.UserInfoChangePage({ name: 'Profile edit' }))
  .use(Links.UserPasswordChangePage, () => new Pages.UserPasswordChangePage({ name: 'Change password' }))
  .use(Links.ClientErrorPage, () => new Pages.ClientErrorPage({ name: 'Client Error' }))
  .use(Links.ServerErrorPage, () => new Pages.ServerErrorPage({ name: 'Server Error' }))
  .use('/*', () => new Pages.ClientErrorPage({ name: 'NotFound' }))
  .start();
