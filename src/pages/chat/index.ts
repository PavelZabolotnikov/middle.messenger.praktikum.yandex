import './chat.scss'
import Block from '../../utils/Block';
import PageLink from '../../components/link';
import ChatPageBlock from './chat-page.hbs?raw';
import ConversationList from '../../components/conversation-list';
import { chatData } from '../../data/chatData';
import { ChatCorrespondence } from '../../components/chat-correspondence';
import MessageSearchInputBlock from '../../components/message-search-input';
import store, { StoreEvents } from '../../store/store';
import Chat from '../../controllers/Chat'
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
      ProfileLink: new PageLink({
        attr: {
          class: 'link__align-right link__sidebar',
          href: Links.UserPage,
        },
        text: 'Профиль >',
      }),
      MessageSearchInputBlock: new MessageSearchInputBlock({
        placeholder: 'Поиск',
      }),
      ConversationList: new ConversationList('div', {
        chats: this.props.chats,
      }),
      ChatCorrespondence: new ChatCorrespondence('div', {
        chat: this.props.current,
        messages: this.props.messages,
        userId: this.state.id,
      }),
    };
    return this.compile(ChatPageBlock, this.props, 'chat-page');
  }
}
