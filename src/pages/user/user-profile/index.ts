import Block from '../../../utils/Block';
import UserProfileBlock from './user-profile.hbs?raw';
import PageLink from '../../../components/link';
import UserPhoto from '../../../components/user-photo';
import UserFirstName from '../../../components/user-name';
import { user } from '../../../data/chatData';
import ProfileInput from '../../../components/user-input';



export class UserPage extends Block {
  constructor(props: { name?: string }) {
    super('div', { ...props });

    this.props.isModalOpen = false;
  }
  handleOpenModal = (event: Event) => {
    if (event.target instanceof HTMLElement) {
      if (event.target.classList.contains('modal__content')) {
        return;
      }
      const element = document.querySelector(`.modal`);
      if (element) {
        element.classList.toggle('hidden');
      }
    }
  };

  render() {
    this.children = {
        UserPhoto: new UserPhoto({
        alt: 'Моё фото',
        src: user.photo,
        id: this.props.id,
        events: {
          mousedown: (e: Event) => this.handleOpenModal(e),
        },
      }),
      UserFirstName: new UserFirstName({
          username: user.first_name,
        }),
        UserEmailInput: new ProfileInput({
          className: 'input-field__bottom-border',
          name: 'email',
          type: 'text',
          value: user.email,
          disabled: true,
          inputName: 'Почта',
        }),
        UserLoginInput: new ProfileInput({
        className: 'input-field__bottom-border',
        name: 'login',
        type: 'text',
        value: user.login,
        disabled: true,
        inputName: 'Логин',
      }),
      UserFirstNameInput: new ProfileInput({
        className: 'input-field__bottom-border',
        name: 'first_name',
        type: 'text',
        value: user.first_name,
        disabled: true,
        inputName: 'Имя',
      }),
      UserSecondNameInput: new ProfileInput({
        className: 'input-field__bottom-border',
        name: 'second_name',
        type: 'text',
        value: user.second_name,
        disabled: true,
        inputName: 'Фамилия',
      }),
      UserDisplayNameInput: new ProfileInput({
        className: 'input-field__bottom-border',
        name: 'display_name',
        type: 'text',
        value: user.display_name,
        disabled: true,
        inputName: 'Имя в чате',
      }),
      UserPhoneInput: new ProfileInput({
        className: 'input-field__bottom-border',
        name: 'phone',
        type: 'text',
        value: user.phone,
        disabled: true,
        inputName: 'Телефон',
      }),
      UserInfoChange: new PageLink({
        attr: {
          class: 'link',
          href: 'userInfoChangePage',
        },
        text: 'Изменить данные',
      }),
      UserPasswordChange: new PageLink({
        attr: {
          class: 'link',
          href: 'userPasswordChangePage',
        },
        text: 'Изменить пароль',
      }),
      Exit: new PageLink({
        attr: {
          class: 'link__right_type_right link__secondary',
          href: 'login',
        },
        text: 'Выйти',
      }),
    };

    return this.compile(UserProfileBlock, this.props);
  }
}