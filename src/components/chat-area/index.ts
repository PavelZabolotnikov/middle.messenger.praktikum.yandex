import './chat-area.scss';
import ChatAreaBlock from './chat-area.hbs?raw';
import Block from '../../utils/Block';
import MessageBlock from '../message-search-input';
import MenuButton from '../menu-button';
import ModalAddUser from '../modal/modal-add-user';
import ModalRemoveUser from '../modal/modal-remove-user';
import Chat from '../../controllers/Chat';
import store from '../../store/store';
import WebSocket from '../../controllers/WebSocket';

interface Chat {
  id: number;
}
export class ChatArea extends Block {
  state: {
    isSubmodalOpen: boolean;
  };

  constructor(props: Record<string, unknown>) {
    super('div', props);

    this.state = {
      isSubmodalOpen: false,
    };
  }
  async componentDidMount() {
    if (this.props.chat) {
      const chatId = this.props.chat as Chat;
      const tokenResponse: { token: string } = await Chat.getWSToken(chatId.id);
      WebSocket.connect(chatId.id, tokenResponse!.token);
      const block = document.getElementById('messages');
      if (block) block.scrollTop = block.scrollHeight;
    }
  }
  handleSendMessage(e: SubmitEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input');
    if (input) {
      const inputValue = input.value;
      const chatId = this.props.chat as Chat;
      WebSocket.sendMessage(chatId.id, inputValue);
    }
  }

  handleOpenModalAddUser = (event: Event) => {
    if (event.target instanceof HTMLElement) {
      if (event.target.classList.contains('content')) {
        return;
      }
      const element = document.querySelector(`.modal`);
      if (element) {
        element.classList.toggle('hidden');
      }
    }
  };

  handleOpenModalRemoveUser = (event: Event) => {
    if (event.target instanceof HTMLElement) {
      if (event.target.classList.contains('content')) {
        return;
      }
      const element = document.querySelector(`.modal-remove`);
      if (element) {
        element.classList.toggle('hidden');
      }
    }
  };

  handleDeleteChat(data: Chat) {
    const id = { chatId: data.id };
    Chat.deleteChat(id);
    store.set('currentChat', null);
  }
  render() {
    this.children = {
      MessageInput: new MessageBlock({
        events: {
          submit: (e: SubmitEvent) => this.handleSendMessage(e),
        },
      }),
      AddUserButton: new MenuButton({
        text: 'Remove user',
        events: {
          click: (e: Event) => this.handleOpenModalRemoveUser(e),
        },
      }),
      RemoveUser: new MenuButton({
        text: 'Add user',
        events: {
          click: (e: Event) => this.handleOpenModalAddUser(e),
        },
      }),
      DeleteChat: new MenuButton({
        text: 'Remove Chat',
        events: {
          click: () => this.handleDeleteChat(this.props.chat as Chat),
        },
      }),
      ModalNewUser: new ModalAddUser({
        chat: this.props.chat as Chat,
        events: {
          click: (e: Event) => this.handleOpenModalAddUser(e),
        },
      }),
      ModalRemoveUser: new ModalRemoveUser({
        chat: this.props.chat as Chat,
        events: {
          click: (e: Event) => this.handleOpenModalRemoveUser(e),
        },
      }),
    };
    return this.compile(ChatAreaBlock, this.props, 'chat');
  }
}
