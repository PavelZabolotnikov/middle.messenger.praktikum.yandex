import './login.scss';
import LoginBlock from './login.hbs?raw'
import Block from "../../utils/Block";
import PagesTitle from "../../components/title/index";
import PageLinkBlock from '../../components/link';
import  ButtonBlock  from "../../components/button";
import InputBlock  from "../../components/input";
import  { validation } from '../../utils/validation';
import { SignInData } from '../../utils/types/auth';
import authController from '../../controllers/Auth';
import { Links } from '../../main';

enum Blocks {
    'login' = 'LoginInput',
    'password' = 'PasswordInput',
  }

  enum InputError {
    'login' = 'Неверный формат логина',
    'password' = 'Неверный формат пароля',
  }

export class LoginPage extends Block {
    constructor(props: {name?: string}) {
 super('div', {...props});
 this.state = {
    login: '',
    password: '',
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
  const inputElements: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input__element');
  inputElements.forEach((inputElement: HTMLInputElement) => {
    const { name, value } = inputElement;
    if (!this.validateField(name, value)) {
      isValid = false;
    }
  });
  return isValid;
}

handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (e.target) {
    if (this.validateAllFields()) {
      console.log('Авторизация \n', this.state);
      const data: SignInData = {
        login: (this.state.login as string) ?? '',
        password: (this.state.password as string) ?? '',
      };
      try {
        await authController.signin(data);
        console.log('Авторизация успешна');
        localStorage.setItem('cookie', 'true');
        (e.target as HTMLButtonElement).classList.remove('error');
      } catch (error) {
        (e.target as HTMLButtonElement).classList.add('error');
      }
    } else {
      console.log('Ошибка авторизации \n', this.state);
      (e.target as HTMLButtonElement).classList.add('error');
    }
  }
};


  render() {
    this.children = {
    PagesTitle: new PagesTitle({
        title: 'Вход',
        class: 'page-title',
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
        PasswordInput: new InputBlock({
            class: 'login-page__input',
            title: 'Пароль',
            name: 'password',
            type: 'password',
            placeholder: '**********',
            events: {
              focusout: (event: Event) => this.handleValidate(event),
            },
          }),
          LoginButton: new ButtonBlock({
            name: 'Авторизоваться',
            class: 'button button-primary',
            events: {
              click: (e: Event) => {
                this.handleSubmit(e);
              },
            },
          }),
          NoAccauntButton: new PageLinkBlock({
            attr: {
              class: 'link',
              href: Links.RegistrationPage,
            },
            text: 'Нет аккаунта?',
          }),
        };

        return this.compile(LoginBlock, this.props);
    }
  }
