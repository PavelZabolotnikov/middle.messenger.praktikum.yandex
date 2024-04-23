import Block from '../../utils/Block';
import PageLink from '../../components/link';
import ChatPageBlock from './chat-page.hbs?raw';



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
      ReturnLink: new PageLink({
        attr: {
          href: 'login',
        },
        text: 'Назад к логину',
      }),
      SearchInput: new SearchInputBlock({
        placeholder: 'Поиск',
      }),

      ChatList: new ChatList('div', {
        chats: chatData,
      }),
      ChatArea: new ChatArea('div', {
        chat: null,
      }),
    };
    return this.compile(ChatPageBlock, this.props, 'chat-page');
  }
}