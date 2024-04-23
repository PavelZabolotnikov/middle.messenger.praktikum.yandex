const login = /^[a-zA-Z_-]{3,20}\D$/;
const password = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;
const email = /^[a-zA-Z0-9_-]+@[a-zA-Z]+\.[a-zA-Z]+$/;
const name = /^([А-ЯA-Z][а-яa-z-]*)$/;
const phone = /^\+?\d{10,15}$/;
const message = /^.*$/;

export const validation = (type: string, value: string, ): boolean => {
  switch (type) {
    case 'login':
      return login.test(value);
    case 'password':
      return password.test(value);
      case 'email':
        return email.test(value);
      case 'name':
        return name.test(value);
      case 'phone':
        return phone.test(value);
        case 'message':
          return message.test(value);
    default:
      return false;
  }
};