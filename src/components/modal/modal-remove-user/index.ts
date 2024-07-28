import ButtonBlock from '../../button';
import ModalBlock from './modal.hbs?raw';
import '../modal.scss';
import Block from '../../../utils/block/Block';
import ModalInput from './modal-input';
import Chat from '../../../controllers/Chat';
interface Chat {
  id: number;
}
interface Props {
  click(e: MouseEvent): unknown;
}

export default class ModalRemoveUser extends Block {
  constructor(props: { [x: string]: unknown; events?: { click: (e: Event) => void } }) {
    super('div', { ...props });

    this.state = {
      inputValue: '',
    };
  }

  handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const events = this.props.events as unknown as Props;
    if (this.state.inputValue) {
      const chat = this.props.chat as Chat;
      const data = {
        users: [this.state.inputValue as number],
        chatId: chat.id,
      };
      Chat.removeUserFromChat(data);
      events.click(e);
    } else {
      console.log('Ошибка удаления пользователя');
    }
  };
  handleInput = (e: Event) => {
    if (e.target && (e.target as HTMLInputElement).value) {
      this.state.inputValue = (e.target as HTMLInputElement).value;
    }
  };

  render() {
    this.children = {
      Input: new ModalInput('div', {
        text: 'Введите имя пользователя',
        events: {
          click: (e: Event) => e.stopPropagation(),
          change: (e: Event) => {
            e.stopPropagation(), e.preventDefault(), this.handleInput(e);
          },
        },
      }),
      Button: new ButtonBlock({
        text: 'Удалить',
        className: 'button button-primary button-primary-size-small',
        events: {
          click: (event: MouseEvent) => this.handleSubmit(event),
        },
      }),
    };
    return this.compile(ModalBlock, this.props, 'modal-remove hidden');
  }
}
