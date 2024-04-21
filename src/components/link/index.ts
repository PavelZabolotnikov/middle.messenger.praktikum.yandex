import Block from '../../utils/Block';
import Link from './link.hbs?raw';

class PageLink extends Block {
  constructor(props: Record<string, unknown>) {
    super('a', props);
  }

  render() {
    return this.compile(Link, this.props);
  }
}

export default PageLink
