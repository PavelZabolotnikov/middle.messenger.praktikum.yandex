import Block from '../../../utils/Block';
import UserPasswordChangeBlock from './user-password-change.hbs?raw';
import UserPhoto from '../../../components/user-photo';
import ProfileInput from '../../../components/user-input';
import ButtonBlock from '../../../components/button';
import { validation } from '../../../utils/validation';
import { Password } from '../../../utils/types/profile';
import Router from '../../../utils/router/Router';
import User from '../../../controllers/User';

enum Blocks {
  'oldPassword' = 'OldPassword',
  'newPassword' = 'NewPassword',
  'password_repeat' = 'NewPasswordRepeat',
}

enum PasswordInputErrorChange {
    'oldPassword' = 'Неверный пароль',
    'newPassword' = 'Недопустимый формат',
    'password_repeat' = 'Пароль не совпадает',
  }

export class UserPasswordChangePage extends Block {
  constructor(props: { name?: string }) {
    super('div', { ...props });
    this.state = {
      oldPassword: '',
      newPassword: '',
    };
  }

  validateField(inputName: string, value: string) {
    const isValid = validation(inputName, value, this.state.newPassword ? (this.state.newPassword as string) : '');
    const errorMessage: string = isValid
      ? ''
      : PasswordInputErrorChange[inputName as keyof typeof PasswordInputErrorChange];
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
        const data: Password = {
          newPassword: (this.state.newPassword as string) ?? '',
          oldPassword: (this.state.oldPassword as string) ?? '',
        };
        User.changePassword(data);
        Router.go('/settings');
        console.log('Успешно изменен пароль \n', this.state);
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
        alt: 'Мой аватар',
        src: this.props.avatar ? `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}` : '',
      }),
      OldPasswordInput: new ProfileInput({
        name: 'oldPassword',
        type: 'password',
        inputName: 'Старый пароль',
        class: 'input-field__bottom-border',
        placeholder: '*********',
      }),
      NewPasswordInput: new ProfileInput({
        name: 'newPassword',
        type: 'password',
        inputName: 'Новый пароль',
        class: 'input-field__bottom-border',
        placeholder: '*********',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      NewPasswordRepeatInput: new ProfileInput({
        name: 'password_repeat',
        type: 'password',
        placeholder: '*********',
        inputName: 'Повторите пароль',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      SaveButton: new ButtonBlock({
        name: 'Сохранить',
        class: 'button button-primary button-primary-size-small',
      }),
    };

    return this.compile(UserPasswordChangeBlock, this.props);
  }
}
