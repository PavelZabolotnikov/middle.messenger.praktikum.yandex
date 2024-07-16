import './dropdown-button.scss';
import Button from './dropdown-button.hbs?raw';
import Block from '../../utils/Block';

export default class DropdownButtonBlock extends Block {
  constructor(props: Record<string, unknown>) {
    super('button', props);
  }
  render() {
    return this.compile(Button, this.props, 'dropdown-button');
  }
}
