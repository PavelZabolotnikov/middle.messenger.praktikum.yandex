import Handlebars from 'handlebars';
import ilon from '../../assets/photo/Ilon.png'
import veider from '../../assets/photo/Veider.png'
import petrov from '../../assets/photo/Petrov.png'
export { default as ChatPage } from './chat-page.hbs?raw';



Handlebars.registerHelper('conversation-list', () => {
    return [
      { name: 'Максимка', message: 'Меня до сих пор не раcкрыли', unread: '2', photo: ilon },
      { name: 'Энакин', message: 'На дальних рубежах всё спокойно', photo: veider },
      { name: 'Сашка', message: 'А можно мне в Рокки сыграть?', unread: '4', photo: petrov },
    ];
  });