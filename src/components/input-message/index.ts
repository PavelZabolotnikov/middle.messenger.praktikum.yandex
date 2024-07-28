import './input-message.scss';
import Input from './input-message.hbs?raw';
import Block from '../../utils/block/Block';
import ArrowButtonBlock from '../arrow-button/index';
export default class MessageBlock extends Block {
  constructor(props: Record<string, unknown>) {
    super('form', props);
  }
  render() {
    this.children = {
      ArrowButton: new ArrowButtonBlock({ content: '' }),
    };
    return this.compile(Input, this.props, 'message-container');
  }
}
