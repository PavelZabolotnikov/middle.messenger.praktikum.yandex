import MessageSearchInput from './message-search-input.hbs?raw';
import Block from '../../utils/block/Block';
import './message-search-input.scss';
import ArrowButtonBlock from '../arrow-button';

export default class MessageBlock extends Block {
  constructor(props: Record<string, unknown>) {
    super('form', props);
  }
  render() {
    this.children = {
      ArrowButton: new ArrowButtonBlock({ content: '' }),
    };
    return this.compile(MessageSearchInput, this.props, 'message-container');
  }
}
