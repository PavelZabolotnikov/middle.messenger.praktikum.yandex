import ChatCorrespondenceBlock from './chat-correspondence.hbs?raw';
import Block from '../../utils/Block';

export class ChatCorrespondence extends Block {
  render() {
    return this.compile(ChatCorrespondenceBlock, this.props, 'chat-area');
  }
}
