import './init-input.scss';
import InputField from './init-input.hbs?raw';
import Block from '../../utils/block/Block';
export default class InputBlock extends Block {
  constructor(props: Record<string, unknown>) {
    super('div', props);
  }
  render() {
    return this.compile(InputField, this.props, this.props.class);
  }
}
