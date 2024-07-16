import './chat.scss'
import ChatPageBlock from './chat-page.hbs?raw';
import Block from '../../utils/Block';
import Link from '../../components/link';
import SearchInputBlock from '../../components/search-input';
import ChatList from '../../components/conversation-list';
import  {ChatArea}  from '../../components/chat-area';
import store, { StoreEvents } from '../../store/store';
import Chat from '../../controllers/Chat'
import DropdownButtonBlock from '../../components/dropdown-button';
import Modal from '../../components/modal/modal-chat-create';
import Auth from '../../controllers/Auth'
import { Links } from '../../main';

export class ChatPage extends Block {
  state: {
    isSubmodalOpen: boolean;
    id: unknown;
  };
  constructor(props: Record<string, unknown>) {
    super('div', props);
    Chat.getChats();
    Auth.getUserData();
    store.on(StoreEvents.Updated, () => {
      this.setProps({ chats: store.getState().chats });
      this.setProps({ current: store.getState().currentChat });
      this.setProps({ user: store.getState().user });
      this.setProps({ messages: store.getState().messages });
    });
    this.state = {
      isSubmodalOpen: false,
      id: this.props.user,
    };
  }

  handleOpenModal = (event: Event) => {
    if (event.target instanceof HTMLElement) {
      if (event.target.classList.contains('modal__content')) {
        return;
      }
      const element = document.querySelector(`.modal-create`);
      if (element) {
        element.classList.toggle('hidden');
      }
    }
  };

  render() {
    this.children = {
      ProfileLink: new Link({
        attr: {
          class: 'link__align-right link__sidebar',
          href: Links.UserPage,
        },
        text: 'Профиль >',
      }),
      DropdownButton: new DropdownButtonBlock({
        events: {
          mousedown: (e: Event) => this.handleOpenModal(e),
        },
      }),
      SearchInput: new SearchInputBlock({
        placeholder: 'Поиск',
      }),
      ChatList: new ChatList('div', {
        chats: this.props.chats,
      }),
      ChatArea: new ChatArea({
        chat: this.props.current,
        messages: this.props.messages,
        userId: this.state.id,
      }),
      Modal: new Modal({
        events: {
          click: (e: Event) => this.handleOpenModal(e),
        },
      }),
    };
    return this.compile(ChatPageBlock, this.props, 'chat-page');
  }
}
