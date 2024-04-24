import './user-photo.scss'
import UserPhotoBlock from './user-photo.hbs?raw';
import Block from '../../utils/Block';
export default class UserPhoto extends Block {
  constructor(props: Record<string, unknown>) {
    super('div', props);
  }
  render() {
    return this.compile(UserPhotoBlock, this.props);
  }
}
