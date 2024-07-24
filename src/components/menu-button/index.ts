import './menu-button.scss';
import MenuButtonBlock from './menu-button.hbs?raw';
import Block from '../../utils/Block';

export default class MenuButton extends Block {
  constructor(props: Record<string, unknown>) {
    super('div', props);
  }
  render() {
    return this.compile(MenuButtonBlock, this.props, 'menu-button');
  }
}
