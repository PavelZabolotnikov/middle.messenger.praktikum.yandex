import './chat-card.scss';
import ChatListBlock from './chat-card.hbs?raw';
import Block from '../../../utils/Block';

export class ChatCard extends Block {
  constructor(props: Record<string, unknown>) {
    super('div', props);
  }
  render() {
    return this.compile(ChatListBlock, this.props, 'chat-card chat-page__list');
  }
}
