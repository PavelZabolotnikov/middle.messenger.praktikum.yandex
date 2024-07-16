import './conversation-list.scss';
import ChatListBlock from './conversation-list.hbs?raw';
import Block from '../../utils/Block';
import { ChatCard } from './chat-card';
import store from '../../store/store';
import WebSocket from '../../controllers/WebSocket';
interface Chat {
  title: string;
  id: number;
  unread_count: number;
  last_message: string;
  avatar: string;
}
export default class ChatList extends Block {
  handeSetChat(chat: unknown) {
    store.set('currentChat', chat);
    WebSocket.closeAll();
    store.set('messages', []);
  }
  render() {
    const chats = this.props.chats as unknown[];
    if (chats) {
      //@ts-expect-error используем заглушку из-за контекста this
      this.children.chat = chats.map((chat: Chat) => {
        return new ChatCard({
          title: chat.title,
          id: chat.id,
          unread: chat.unread_count,
          last_message: chat.last_message,
          avatar: chat.avatar,
          events: {
            click: () => this.handeSetChat(chat),
          },
        });
      });
    }
    return this.compile(ChatListBlock, this.props, 'chat-list chat-page__list');
  }
}
