import UserFirstName from './user-name.hbs?raw';
import Block from '../../utils/Block';

export default class UserNameBlock extends Block {
  constructor(props: Record<string, unknown>) {
    super('div', props);
  }
  render() {
    return this.compile(UserFirstName, this.props, this.props.className);
  }
}
