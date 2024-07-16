import ButtonBlock from '../../button';
import ModalBlock from './modal.hbs?raw';
import '../modal.scss';
import Block from '../../../utils/Block';
import ModalInput from './modal-input';
import Chat from '../../../controllers/Chat';

interface Props {
  click(e: MouseEvent): unknown;
}

export default class Modal extends Block {
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
      const data = {
        title: this.state.inputValue,
      };
      Chat.createChat(data);
      events.click(e);
    } else {
      console.log('Ошибка создания чата');
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
        text: 'Введите название чата',
        events: {
          click: (e: Event) => e.stopPropagation(),
          change: (e: Event) => {
            e.stopPropagation(), e.preventDefault(), this.handleInput(e);
          },
        },
      }),
      Button: new ButtonBlock({
        text: 'Создать',
        className: 'button button_primary button_primary_size_small',
        events: {
          click: (event: MouseEvent) => this.handleSubmit(event),
        },
      }),
    };
    return this.compile(ModalBlock, this.props, 'modal-create hidden');
  }
}
