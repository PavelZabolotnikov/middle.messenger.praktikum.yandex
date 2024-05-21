import ConversationListBlock from './conversation-list.hbs?raw';

import Block from '../../utils/Block';

export default class ConversationList extends Block {
  render() {
    return this.compile(ConversationListBlock, this.props, 'chat-list chat-page__list');
  }
}
