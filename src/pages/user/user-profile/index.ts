import Block from '../../../utils/Block';
import UserProfileBlock from './user-profile.hbs?raw';
import PageLink from '../../../components/link';
import ProfileAvatar from '../../../components/profile/profile-avatar';
import ProfileUserTitleBlock from '../../../components/profile/profile-title';
import ProfileInput from '../../../components/profile/profile-input';
import { Links } from '../../../main';
import authController from '../../../controllers/Auth';
import store, { StoreEvents } from '../../../store/store';
import Auth from '../../../controllers/Auth';


export class UserPage extends Block {
  constructor(props: { name?: string }) {
    super('div', { ...props });
    this.props.isModalOpen = false;
    Auth.getUserData();
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState().user);
    });
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
        UserProfileAvatarPhoto: new ProfileAvatar({
        alt: 'Моё фото',
        src: this.props.avatar ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}` : '',
        id: this.props.id,
        events: {
          mousedown: (e: Event) => this.handleOpenModal(e),
        },
      }),
      UserTitle: new ProfileUserTitleBlock({
        username: this.props.first_name ?? '',
        }),
        UserEmailInput: new ProfileInput({
          class: 'input-field__bottom-border',
          name: 'email',
          type: 'text',
          value: this.props.email ?? '',
          disabled: true,
          inputName: 'Почта',
        }),
        UserLoginInput: new ProfileInput({
        class: 'input-field__bottom-border',
        name: 'login',
        type: 'text',
        value: this.props.login ?? '',
        disabled: true,
        inputName: 'Логин',
      }),
      UserFirstNameInput: new ProfileInput({
        class: 'input-field__bottom-border',
        name: 'first_name',
        type: 'text',
        value: this.props.first_name ?? '',
        disabled: true,
        inputName: 'Имя',
      }),
      UserSecondNameInput: new ProfileInput({
        class: 'input-field__bottom-border',
        name: 'second_name',
        type: 'text',
        value: this.props.second_name ?? '',
        disabled: true,
        inputName: 'Фамилия',
      }),
      UserDisplayNameInput: new ProfileInput({
        class: 'input-field__bottom-border',
        name: 'display_name',
        type: 'text',
        value: this.props.display_name ?? '',
        disabled: true,
        inputName: 'Имя в чате',
      }),
      UserPhoneInput: new ProfileInput({
        class: 'input-field__bottom-border',
        name: 'phone',
        type: 'text',
        value: this.props.phone ?? '',
        disabled: true,
        inputName: 'Телефон',
      }),
      UserInfoChange: new PageLink({
        attr: {
          class: 'link',
          href: Links.UserInfoChangePage,
        },
        text: 'Изменить данные',
      }),
      UserPasswordChange: new PageLink({
        attr: {
          class: 'link',
          href: Links.UserPasswordChangePage,
        },
        text: 'Изменить пароль',
      }),
      Exit: new PageLink({
        attr: {
          class: 'link__right_type_right link__secondary',
        },
        text: 'Выйти',
        events: {
          click: () => {
            localStorage.clear(), authController.logout();
          },
        },
      }),
    };

    return this.compile(UserProfileBlock, this.props);
  }
}
