import ProfileUserTitle from './profile-user.hbs?raw';
import Block from '../../../utils/block/Block';
import '../profile.scss';
export default class ProfileUserTitleBlock extends Block {
  constructor(props: Record<string, unknown>) {
    super('div', props);
  }
  render() {
    return this.compile(ProfileUserTitle, this.props, this.props.className);
  }
}
