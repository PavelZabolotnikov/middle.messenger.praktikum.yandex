const login = /^[a-zA-Z_-]{3,20}\D$/;
const password = /^(?=.*[A-Z])(?=.*\d).{8,40}$/;

export const validation = (type: string, value: string, ): boolean => {
  switch (type) {
    case 'login':
      return login.test(value);
    case 'password':
      return password.test(value);
    default:
      return false;
  }
};