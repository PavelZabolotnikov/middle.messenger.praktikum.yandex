import './title.scss';
import Block from '../../utils/Block';
import Title from './title.hbs?raw';


export default class PagesTitle extends Block {
    constructor(props: Record<string, unknown>) {
      super('h1', props);
    }
    render() {
      return this.compile(Title, this.props, this.props.class);
    }
  }
