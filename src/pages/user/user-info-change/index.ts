import Block from '../../../utils/Block';
import ChangeUserInfoBlock from './user-info-change.hbs?raw';
import UserPhoto from '../../../components/user-photo';
import UserFirstName from '../../../components/user-name';
import ProfileInput from '../../../components/user-input';
import ButtonBlock from '../../../components/button';
import { user } from '../../../data/chatData';
import { validation } from '../../../utils/validation';

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
        src: user.photo,
      }),
      UserFirstName: new UserFirstName({
        username: user.first_name,
      }),
      UserEmailInput: new ProfileInput({
        className: 'input-field__bottom-border',
        name: 'email',
        type: 'text',
        value: user.email,
        disabled: false,
        inputName: 'Почта',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      UserLoginInput: new ProfileInput({
        className: 'input-field__bottom-border',
        name: 'login',
        type: 'text',
        value: user.login,
        disabled: false,
        inputName: 'Логин',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      UserFirstNameInput: new ProfileInput({
        className: 'input-field__bottom-border',
        name: 'first_name',
        type: 'text',
        value: user.first_name,
        disabled: false,
        inputName: 'Имя',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      UserSecondNameInput: new ProfileInput({
        className: 'input-field__bottom-border',
        name: 'second_name',
        type: 'text',
        value: user.second_name,
        disabled: false,
        inputName: 'Фамилия',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      UserDisplayNameInput: new ProfileInput({
        className: 'input-field__bottom-border',
        name: 'display_name',
        type: 'text',
        value: user.display_name,
        disabled: false,
        inputName: 'Имя в чате',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      UserPhoneInput: new ProfileInput({
        className: 'input-field__bottom-border',
        name: 'phone',
        type: 'text',
        value: user.phone,
        disabled: false,
        inputName: 'Телефон',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      SaveButton: new ButtonBlock({
        name: 'Сохранить',
        className: 'button button_primary button_primary_size_small',
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
