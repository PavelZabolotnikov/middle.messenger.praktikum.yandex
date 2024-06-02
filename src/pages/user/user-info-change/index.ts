import Block from '../../../utils/Block';
import ChangeUserInfoBlock from './user-info-change.hbs?raw';
import UserPhoto from '../../../components/user-photo';
import UserFirstName from '../../../components/user-name';
import ProfileInput from '../../../components/user-input';
import ButtonBlock from '../../../components/button';
import { user } from '../../../data/chatData';
import { validation } from '../../../utils/validation';
import Auth from '../../../controllers/Auth';
import store, { StoreEvents } from '../../../store/store';
import User from '../../../controllers/User';
import { ProfileData } from '../../../utils/types/profile';
import Router from '../../../utils/router/Router';

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
        UserPhoto: new UserPhoto({
        alt: 'Моё фото',
        src: this.props.avatar ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}` : '',
      }),
      UserFirstName: new UserFirstName({
        username: this.props.first_name ?? '',
      }),
      UserEmailInput: new ProfileInput({
        class: 'input-field__bottom-border',
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
        class: 'input-field__bottom-border',
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
        class: 'input-field__bottom-border',
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
        class: 'input-field__bottom-border',
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
        class: 'input-field__bottom-border',
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
        class: 'input-field__bottom-border',
        name: 'phone',
        type: 'text',
        value: this.props.phone ?? '',
        disabled: false,
        inputName: 'Телефон',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      SaveButton: new ButtonBlock({
        name: 'Сохранить',
        class: 'button button-primary button-primary-size-small',
        events: {
          click: (e: Event) => {
            this.handleSubmit(e);
          },
        },
      }),
    };

    return this.compile(ChangeUserInfoBlock, this.props);
  }
}
