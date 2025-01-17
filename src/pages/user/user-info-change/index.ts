import '../user-page.scss';
import Block from '../../../utils/Block';
import ChangeUserInfoBlock from './user-info-change.hbs?raw';
import ProfileAvatar from '../../../components/profile/profile-avatar';
import ProfileUserTitleBlock from '../../../components/profile/profile-title';
import ProfileInput from '../../../components/profile/profile-input';
import ButtonBlock from '../../../components/button';
import { validation } from '../../../utils/validation';
import Auth from '../../../controllers/Auth';
import store, { StoreEvents } from '../../../store/store';
import User from '../../../controllers/User';
import { ProfileData } from '../../../utils/types/profile';
import Router from '../../../utils/router/Router';
import ArrowButtonBlock from '../../../components/arrow-button';
import Modal from '../../../components/modal/modal-avatar';

export enum InputError {
    'email' = 'Введите корректный email',
    'login' = 'Неверный формат логина',
    'first_name' = 'Неверный формат имени',
    'second_name' = 'Неверный формат фамилии',
    'phone' = 'Неверный формат',
  }

enum Blocks {
  'email' = 'UserEmailInput',
  'login' = 'UserLoginInput',
  'first_name' = 'UserFirstNameInput',
  'second_name' = 'UserSecondNameInput',
  'display_name' = 'UserDisplayNameInput',
  'phone' = 'UserPhoneInput',
}
export class UserInfoChangePage extends Block {
  constructor(props: { name?: string }) {
    super('div', { ...props });
    Auth.getUserData();
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState().user);
    });
    this.state = {
      email: '',
      login: '',
      first_name: '',
      second_name: '',
      phone: '',
      display_name: '',
    };
  }

  validateField(inputName: string, value: string) {
    const isValid = validation(inputName, value);
    const errorMessage: string = isValid ? '' : InputError[inputName as keyof typeof InputError];
    this.children[inputName == (inputName as keyof typeof Blocks) ? Blocks[inputName] : 'login']?.setProps({
      errorMessage: errorMessage,
      value: value,
    });
    this.state[inputName] = value;
    return isValid;
  }

  handleValidate = (event: Event) => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    if (target) {
      const { name, value } = target;
      this.validateField(name, value);
      this.state[name] = value;
    }
  };
  validateAllFields(): boolean {
    let isValid: boolean = true;
    const inputElements: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input');
    inputElements.forEach((inputElement: HTMLInputElement) => {
      const { name, value } = inputElement;
      if (!this.validateField(name, value)) {
        isValid = false;
      }
    });
    return isValid;
  }

  handleOpenModal = (event: Event) => {
    if (event.target instanceof HTMLElement) {
      if (event.target.classList.contains('content')) {
        return;
      }
      const element = document.querySelector(`.modal`);
      if (element) {
        element.classList.toggle('hidden');
      }
    }
  };

  handleSubmit = (e: Event) => {
    e.preventDefault();
    if (e.target) {
      if (this.validateAllFields()) {
        const data: ProfileData = {
          login: (this.state.login as string) ?? '',
          password: (this.state.password as string) ?? '',
          email: (this.state.email as string) ?? '',
          first_name: (this.state.first_name as string) ?? '',
          second_name: (this.state.second_name as string) ?? '',
          phone: (this.state.phone as string) ?? '',
          display_name: (this.state.display_name as string) ?? '',
        };
        User.putUserData(data);
        Router.go('/settings');
        console.log('Успешно изменен профиль \n', this.state);
        (e.target as HTMLButtonElement).classList.remove('error');
      } else {
        console.log('Ошибка \n', this.state);
        (e.target as HTMLButtonElement).classList.add('error');
      }
    }
  };
  render() {
    this.children = {
      ProfileAvatar: new ProfileAvatar({
        alt: 'Мой аватар',
        src: this.props.avatar ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}` : '',
        id: this.props.id,
        events: {
          mousedown: (e: Event) => this.handleOpenModal(e),
        },
      }),
      ProfileUserTitleBlock: new ProfileUserTitleBlock({
        username: this.props.first_name ?? '',
      }),
      UserEmailInput: new ProfileInput({
        class: 'bottom-border',
        name: 'email',
        type: 'text',
        value: this.props.email ?? '',
        disabled: false,
        inputName: 'Почта',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      UserLoginInput: new ProfileInput({
        class: 'bottom-border',
        name: 'login',
        type: 'text',
        value: this.props.login ?? '',
        disabled: false,
        inputName: 'Логин',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      UserFirstNameInput: new ProfileInput({
        class: 'bottom-border',
        name: 'first_name',
        type: 'text',
        value: this.props.first_name ?? '',
        disabled: false,
        inputName: 'Имя',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      UserSecondNameInput: new ProfileInput({
        class: 'bottom-border',
        name: 'second_name',
        type: 'text',
        value: this.props.second_name ?? '',
        disabled: false,
        inputName: 'Фамилия',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      UserDisplayNameInput: new ProfileInput({
        class: 'bottom-border',
        name: 'display_name',
        type: 'text',
        value: this.props.display_name ?? '',
        disabled: false,
        inputName: 'Имя в чате',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      UserPhoneInput: new ProfileInput({
        class: 'bottom-border',
        name: 'phone',
        type: 'text',
        value: this.props.phone ?? '',
        disabled: false,
        inputName: 'Телефон',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      Modal: new Modal({
        events: {
          click: (e: Event) => this.handleOpenModal(e),
        },
      }),
      SaveButton: new ButtonBlock({
        text: 'Сохранить',
        class: 'button button-primary button-primary-size-small',
        events: {
          click: (e: Event) => {
            this.handleSubmit(e);
          },
        },
      }),
      ArrowButton: new ArrowButtonBlock({
        content: '',
        events: {
          click: () => Router.back(),
        },
      }),
    };

    return this.compile(ChangeUserInfoBlock, this.props);
  }
}
