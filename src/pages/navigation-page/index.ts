import './navigate.scss';
import Block from '../../utils/Block';
import NavigatePage  from './navigate.hbs?raw';
import PageTitle from "../../components/title/index";
import PageLink from '../../components/link';

export class NavigationPage extends Block {
    constructor(props: { name?: string }) {
      super('div', { ...props });
    }

    render() {
        this.children = {
          PageTitle: new PageTitle({
            title: 'Навигация по страницам',
            className: 'page-title',
          }),
          LoginPageLink: new PageLink({
            attr: {
              href: 'login',
              class: 'link',
            },
            text: 'Логин',
          }),
          RegistrationPageLink: new PageLink({
            attr: {
              href: 'registration',
              class: 'link',
            },
            text: 'Регистрация',
          }),
          UserPageLink: new PageLink({
            attr: {
              href: 'userPage',
              class: 'link',
            },
            text: 'Профиль',
          }),
          UserInfoChangePageLink: new PageLink({
            attr: {
              href: 'userInfoChangePage',
              class: 'link',
            },
            text: 'Изменить профиль',
          }),
          UserPasswordChangePageLink: new PageLink({
            attr: {
              href: 'userPasswordChangePage',
              class: 'link',
            },
            text: 'Изменить пароль',
          }),
          ChatPageLink: new PageLink({
            attr: {
              href: 'chatPage',
              class: 'link',
            },
            text: 'Чат',
          }),
          NotFoundPageLink: new PageLink({
            attr: {
              href: '404Page',
              class: 'link',
            },
            text: '404',
          }),
          ServerErrorPageLink: new PageLink({
            attr: {
              href: '500Page',
              class: 'link',
            },
            text: '500',
          }),
        };
    
        return this.compile(NavigatePage, this.props);
      }
    }