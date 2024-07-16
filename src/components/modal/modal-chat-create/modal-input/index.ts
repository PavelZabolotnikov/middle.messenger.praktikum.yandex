import ModalBlock from './modal-input.hbs?raw';
import '../../modal.scss';
import Block from '../../../../utils/Block';

export default class ModalInput extends Block {
  render() {
    return this.compile(ModalBlock, this.props);
  }
}
