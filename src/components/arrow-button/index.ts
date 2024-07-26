import './arrow-button.scss';
import ArrowButton from './arrow-button.hbs?raw';
import Block from '../../utils/block/Block';

export default class ArrowButtonBlock extends Block {
  constructor(props: Record<string, unknown>) {
    super('button', props);
  }
  render() {
    return this.compile(ArrowButton, this.props, 'arrow-button');
  }
}
