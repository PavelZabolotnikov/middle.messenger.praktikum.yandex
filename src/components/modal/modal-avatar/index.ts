import ButtonBlock from '../../button';
import ModalBlock from './modal.hbs?raw';
import '../modal.scss';
import Block from '../../../utils/Block';
import ModalInput from './modal-input';
import User from '../../../controllers/User';

interface Props {
  click(e: MouseEvent): unknown;
}

export default class Modal extends Block {
  constructor(props: { [x: string]: unknown; events?: { click: (e: Event) => void } }) {
    super('div', { ...props });

    this.state = {
      avatarFile: null,
      errorText: 'test',
    };
  }

  handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const events = this.props.events as unknown as Props;
    const avatar: File = this.state.avatarFile as File;
    if (avatar) {
      const formData = new FormData();
      formData.append('avatar', avatar);
      User.putUserAvatar(formData);
      events.click(e);
    } else {
      console.log('Ошибка: файл аватара не выбран');
    }
  };

  handleSetImage = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const file = inputElement.files[0];
      if (
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg' ||
        file.type === 'image/gif' ||
        file.size <= 100
      ) {
        this.state.avatarFile = file;
      } else {
        this.state.errorTitle = 'Некоректный формат/вес файла';
      }
    }
  };

  render() {
    this.children = {
      Input: new ModalInput('div', {
        text: 'Выбрать файл на компьютере',

        events: {
          change: (event: Event) => {
            this.handleSetImage(event);
          },
        },
      }),
      Button: new ButtonBlock({
        text: 'Поменять',
        className: 'button button_primary button_primary_size_small',
        events: {
          click: (event: MouseEvent) => this.handleSubmit(event),
        },
      }),
    };
    return this.compile(ModalBlock, this.props, 'modal hidden');
  }
}
