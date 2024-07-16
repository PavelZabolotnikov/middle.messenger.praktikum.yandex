import './search-input.scss';
import SearchInput from './search-input.hbs?raw';
import Block from '../../utils/Block';

export default class SearchInputBlock extends Block {
  constructor(props: Record<string, unknown>) {
    super('div', props);
  }
  render() {
    return this.compile(SearchInput, this.props, this.props.className);
  }
}
