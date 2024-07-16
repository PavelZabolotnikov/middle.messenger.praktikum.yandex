import UserInputBlock from './profile-input.hbs?raw';
import Block from '../../../utils/Block';

export default class ProfileInput extends Block {
  constructor(props: Record<string, unknown>) {
    super('li', props);
  }
  render() {
    return this.compile(UserInputBlock, this.props, `wrapper ${this.props.class}`);
  }
}
