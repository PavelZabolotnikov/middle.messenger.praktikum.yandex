import './input-field.scss';
import InputField from './input-field.hbs?raw';
import Block from '../../utils/Block';
export default class InputFieldBlock extends Block {
  constructor(props: Record<string, unknown>) {
    super('div', props);
  }
  render() {
    return this.compile(InputField, this.props, this.props.className);
  }
}
