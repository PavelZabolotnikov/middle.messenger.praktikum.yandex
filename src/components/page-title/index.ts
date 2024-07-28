import './page-title.scss';
import Block from '../../utils/block/Block';
import PageTitle from './page-title.hbs?raw';


export default class PagesTitle extends Block {
    constructor(props: Record<string, unknown>) {
      super('h1', props);
    }
    render() {
      return this.compile(PageTitle, this.props, this.props.class);
    }
  }
