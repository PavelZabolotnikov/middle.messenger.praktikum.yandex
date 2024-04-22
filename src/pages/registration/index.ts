import './registration.scss';
import Block from "../../utils/Block";
import PageTitle from "../../components/title/index";
import InputBlock  from "../../components/input";
import  ButtonBlock  from "../../components/button";
import PageLinkBlock from '../../components/link';
import RegistrationBlock from './registration.hbs?raw';
import  { validation } from '../../utils/validation';

enum Blocks {
    'email' = 'EmailInput',
    'login' = 'LoginInput',
    'first_name' = 'FirstNameInput',
    'second_name' = 'SecondNameInput',
    'phone_number' = 'PhoneNumberInput',
    'password' = 'PasswordInput',
    'repeat_password' = 'PasswordRepeatInputField',
  }

  enum InputError {
    'email' = 'Неверный формат почтого ящика',
    'login' = 'Неверный формат логина',
    'first_name' = 'Неверный формат имени',
    'second_name' = 'Неверный формат фамилии',
    'phone' = 'Неверный формат телефона',
    'password' = 'Неверный формат пароля',
    'repeat_password' = 'Пароли должны совпадать',
  }

  export class RegistrationPage extends Block {
    constructor(props: { name?: string }) {
      super('div', { ...props });
      this.state = {
        email: '',
        login: '',
        first_name: '',
        second_name: '',
        phone: '',
        password: '',
        password_repeat: '',
      };
    }


validateField(inputName: string, value: string) {
    const isValid = validation(inputName, value);
    const errorMessage: string = isValid ? '' : InputError[inputName as keyof typeof InputError];
    this.children[inputName == (inputName as keyof typeof Blocks) ? Blocks[inputName] : 'login']?.setProps({
      errorMessage: errorMessage,
      value: value,
    });
    if (inputName === 'repeat_password') {
        return isValid;
      }
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
    const inputElements: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input__element');
    inputElements.forEach((inputElement: HTMLInputElement) => {
      const { name, value } = inputElement;
      if (!this.validateField(name, value)) {
        isValid = false;
      }
    });
    return isValid;
  }

  handleSubmit = (event: Event) => {
    event.preventDefault();
    if (event.target) {
      if (this.validateAllFields()) {
        console.log('Успешно зарегистрирован \n', this.state);
        (event.target as HTMLButtonElement).classList.remove('error');
      } else {
        console.log('Ошибка \n', this.state);
        (event.target as HTMLButtonElement).classList.add('error');
      }
    }
  };

  render() {
    this.children = {
      PageTitle: new PageTitle({
        title: 'Регистрация',
        className: 'page-title',
      }),
      EmailInput: new InputBlock({
        className: 'login-page__input',
        title: 'Почта',
        name: 'email',
        type: 'text',
        placeholder: 'Почта',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      LoginInput: new InputBlock({
        className: 'login-page__input',
        title: 'Логин',
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      FirstNameInput: new InputBlock({
        className: 'login-page__input',
        title: 'Имя',
        name: 'first_name',
        type: 'text',
        placeholder: 'Имя',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      SecondNameInput: new InputBlock({
        className: 'login-page__input',
        title: 'Фамилия',
        name: 'second_name',
        type: 'text',
        placeholder: 'Фамилия',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      PhoneNumberInput: new InputBlock({
        className: 'login-page__input',
        title: 'Телефон',
        name: 'phone',
        type: 'text',
        placeholder: 'Телефон',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      PasswordInput: new InputBlock({
        className: 'login-page__input',
        title: 'Пароль',
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      PasswordRepeatInputField: new InputBlock({
        className: 'login-page__input',
        title: 'Пароль (еще раз)',
        name: 'repeat_password',
        type: 'password',
        placeholder: 'Пароль (еще раз)',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      RegistrationButton: new ButtonBlock({
        text: 'Зарегистрироваться',
        className: 'button button_primary',
        events: {
          click: (e: Event) => {
            this.handleSubmit(e);
          },
        },
      }),
      EnterButton: new PageLinkBlock({
        attr: {
          class: 'link',
          href: 'login',
        },
        text: 'Войти',
        className: 'button_secondary',
        url: 'login',
      }),
    };

    return this.compile(RegistrationBlock, this.props);
  }
}