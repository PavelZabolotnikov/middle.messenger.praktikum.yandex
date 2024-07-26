import ProfileAvatarBlock from './avatar.hbs?raw';
import Block from '../../../utils/block/Block';
import '../profile.scss';

export default class ProfileAvatar extends Block {
  constructor(props: Record<string, unknown>) {
    super('div', props);
  }
  render() {
    return this.compile(ProfileAvatarBlock, this.props);
  }
}
