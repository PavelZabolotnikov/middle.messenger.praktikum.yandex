import Block from '../../utils/Block';
import PageLink from '../../components/link';
import ChatPageBlock from './chat-page.hbs?raw';
import ConversationList from '../../components/conversation-list';
import { chatData } from '../../data/chatData';
import { ChatCorrespondence } from '../../components/chat-correspondence';
import MessageSearchInputBlock from '../../components/message-search-input';



export class ChatPage extends Block {
  constructor(props: Record<string, unknown>) {
    super('div', props);
  }

  render() {
    this.children = {
      ProfileLink: new PageLink({
        attr: {
          class: 'link__align-right link__sidebar',
          href: 'profile',
        },
        text: 'Профиль >',
      }),
      MessageSearchInputBlock: new MessageSearchInputBlock({
        placeholder: 'Поиск',
      }),
      ConversationList: new ConversationList('div', {
        chats: chatData,
      }),
      ChatCorrespondence: new ChatCorrespondence('div', {
        chat: null,
      }),
    };
    return this.compile(ChatPageBlock, this.props, 'chat-page');
  }
}
