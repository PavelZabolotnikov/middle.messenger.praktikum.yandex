import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import resolvePath from './utils/index';

const pages = {
  '/': [Pages.NavigatePage],
  login: [Pages.LoginPage],
  registration: [Pages.RegistrationPage],
  userPage: [Pages.UserPage],
  userInfoChangePage: [Pages.UserInfoChangePage],
  userPasswordChangePage: [Pages.UserPasswordChangePage],
  chatPage: [Pages.ChatPage],
  '404Page': [Pages.ClientErrorPage],
  '500Page': [Pages.ServerErrorPage],
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  //@ts-ignore
  const [source, context] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.querySelector('main')!.innerHTML = handlebarsFunct(source);
  updateURL(page);
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
