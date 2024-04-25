import Block from '../../../utils/Block';
import UserPasswordChangeBlock from './user-password-change.hbs?raw';
import UserPhoto from '../../../components/user-photo';
import ProfileInput from '../../../components/user-input';
import ButtonBlock from '../../../components/button';
import { validation } from '../../../utils/validation';
import { user } from '../../../data/chatData';

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
  render() {
    this.children = {
        UserPhoto: new UserPhoto({
        alt: 'Мой аватар',
        src: user.photo,
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
        class: 'button button_primary button_primary_size_small',
      }),
    };

    return this.compile(UserPasswordChangeBlock, this.props);
  }
}
