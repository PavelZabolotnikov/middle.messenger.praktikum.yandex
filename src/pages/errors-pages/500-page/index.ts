import ServerErrorPageBlock from './500-error-page.hbs?raw';
import PageLink from '../../../components/link';
import Block from '../../../utils/Block';

export class ServerErrorPage extends Block {
  constructor(props: { name?: string }) {
    super('div', { ...props });
  }

  render() {
    this.children = {
        PageLink: new PageLink({
        attr: {
          class: 'link',
          href: '/',
        },
        text: 'Назад к чатам',
      }),
    };

    return this.compile(ServerErrorPageBlock, this.props);
  }
}
