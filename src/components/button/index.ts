import './button.scss';
import Block from '../../utils/Block';
import Button from './button.hbs?raw';

export default class ButtonBlock extends Block {
    constructor(props: Record<string, unknown>) {
      super('button', props);
    }
    render() {
      return this.compile(Button, this.props, this.props.className);
    }
  }
