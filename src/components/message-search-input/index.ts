import MessageSearchInput from './message-search-input.hbs?raw';
import Block from '../../utils/Block';

export default class MessageSearchInputBlock extends Block {
  constructor(props: Record<string, unknown>) {
    super('div', props);
  }
  render() {
    return this.compile(MessageSearchInput, this.props, this.props.class);
  }
}
