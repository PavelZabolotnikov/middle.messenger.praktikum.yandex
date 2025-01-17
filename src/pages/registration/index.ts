import './registration.scss';
import Block from "../../utils/Block";
import PagesTitle from "../../components/page-title/index";
import InputBlock  from "../../components/input";
import  ButtonBlock  from "../../components/button";
import PageLinkBlock from '../../components/link';
import RegistrationBlock from './registration.hbs?raw';
import  { validation } from '../../utils/validation';
import { SignUpData } from '../../utils/types/auth';
import authController from '../../controllers/Auth';
import { Links } from '../../main';

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
        password_repeat: null,
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

  handleSubmit = async (event: Event) => {
    event.preventDefault();
    if (event.target) {
      if (this.validateAllFields()) {
        const data: SignUpData = {
          login: (this.state.login as string) ?? '',
          password: (this.state.password as string) ?? '',
          email: (this.state.email as string) ?? '',
          first_name: (this.state.first_name as string) ?? '',
          second_name: (this.state.second_name as string) ?? '',
          phone: (this.state.phone as string) ?? '',
        };
        try {
          await authController.signup(data);
          console.log('Регистрация успешна');
          (event.target as HTMLButtonElement).classList.remove('error');
        } catch (error) {
          (event.target as HTMLButtonElement).classList.add('error');
        }
      } else {
        console.log('Ошибка регистрации \n', this.state);
        (event.target as HTMLButtonElement).classList.add('error');
      }
    }
  };

  render() {
    this.children = {
      PagesTitle: new PagesTitle({
        title: 'Регистрация',
        class: 'page-title',
      }),
      EmailInput: new InputBlock({
        class: 'login-page__input',
        title: 'Почта',
        name: 'email',
        type: 'text',
        placeholder: 'Почта',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      LoginInput: new InputBlock({
        class: 'login-page__input',
        title: 'Логин',
        name: 'login',
        type: 'text',
        placeholder: 'Логин',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      FirstNameInput: new InputBlock({
        class: 'login-page__input',
        title: 'Имя',
        name: 'first_name',
        type: 'text',
        placeholder: 'Имя',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      SecondNameInput: new InputBlock({
        class: 'login-page__input',
        title: 'Фамилия',
        name: 'second_name',
        type: 'text',
        placeholder: 'Фамилия',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      PhoneNumberInput: new InputBlock({
        class: 'login-page__input',
        title: 'Телефон',
        name: 'phone',
        type: 'text',
        placeholder: 'Телефон',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      PasswordInput: new InputBlock({
        class: 'login-page__input',
        title: 'Пароль',
        name: 'password',
        type: 'password',
        placeholder: 'Пароль',
        events: {
          focusout: (event: Event) => this.handleValidate(event),
        },
      }),
      PasswordRepeatInputField: new InputBlock({
        class: 'login-page__input',
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
        class: 'button button_primary',
        events: {
          click: (e: Event) => {
            this.handleSubmit(e);
          },
        },
      }),
      EnterButton: new PageLinkBlock({
        attr: {
          class: 'link',
          href: Links.LoginPage,
        },
        text: 'Войти',
        class: 'button-secondary',
        url: 'chatPage',
      }),
    };

    return this.compile(RegistrationBlock, this.props);
  }
}
