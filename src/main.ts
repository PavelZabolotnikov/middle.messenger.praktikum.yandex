import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import resolvePath from './utils/index';
import Block from './utils/Block';

const pages: { [key: string]: Block } = {
  '/':new Pages.NavigatePage({name: 'NavigationPage'}),
  '/login': [Pages.LoginPage],
  '/registration': [Pages.RegistrationPage],
  '/userPage': [Pages.UserPage],
  '/userInfoChangePage': [Pages.UserInfoChangePage],
  '/userPasswordChangePage': [Pages.UserPasswordChangePage],
  '/chatPage': [Pages.ChatPage],
  '/404Page': [Pages.ClientErrorPage],
  '/500Page': [Pages.ServerErrorPage],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const container = document.getElementById('app')!;
  if(source instanceof Object) {
    const page = new source(context);
    container.innerHTML = '';
    container.append(page.getContent());
    // page.dispatchComponentDidMount();
    return;
  }

  container.innerHTML = Handlebars.compile(source)(context);
}

function updateURL(page: string) {
  history.pushState({ page }, '', `${page}`);
}

document.addEventListener('DOMContentLoaded', () => navigate('/'));

document.addEventListener('click', (e) => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});

Handlebars.registerHelper('resolve', resolvePath);

window.addEventListener('popstate', (event) => {
  const page = event.state.page;
  if (page) {
    navigate(page);
  }
});
