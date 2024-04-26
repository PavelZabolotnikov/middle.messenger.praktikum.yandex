import * as Pages from './pages';
import Block from './utils/Block';

document.addEventListener('DOMContentLoaded', function () {
  const { pathname } = window.location;
  const renderDOM = (query: string, block: Block) => {
    const root = document.querySelector(query);
    if (root) {
      root.appendChild(block.getContent() as HTMLElement);
    }
    block.dispatchComponentDidMount();
    return root;
  };

  const pages: { [key: string]: Block } = {
  '/': new Pages.NavigationPage({ name: 'NavigationPage'}),
  '/login': new Pages.LoginPage({ name: 'LoginPage' }),
  '/registration': new Pages.RegistrationPage({ name: 'RegistrationPage' }),
  '/userPage': new Pages.UserPage({ name: 'UserPage' }),
  '/userInfoChangePage': new Pages.UserInfoChangePage({ name: 'UserInfoChangePage' }),
  '/userPasswordChangePage': new Pages.UserPasswordChangePage({ name: 'UserPasswordChangePage' }),
  '/chatPage': new Pages.ChatPage({ name:'ChatPage'}),
  '/404Page': new Pages.ClientErrorPage({ name: 'ClientErrorPage' }),
  '/500Page': new Pages.ServerErrorPage({ name: 'ServerErrorPage' }),
};

const render = () => {
  const Page = pages[pathname];
  if (Page) {
    renderDOM('.app', Page);
  }
};

render();
});
