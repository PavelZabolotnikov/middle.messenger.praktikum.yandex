import ClientErrorPageBlock from './404-error-page.hbs?raw';
import PageLink from '../../../components/link';
import Block from '../../../utils/Block';

export class ClientErrorPage extends Block {
  constructor(props: { name?: string }) {
    super('div', { ...props });
  }

  render() {
    this.children = {
        PageLink: new PageLink({
        attr: {
            href: '/',
          class: 'link',
        },
        text: 'Назад к чатам',
      }),
    };

    return this.compile(ClientErrorPageBlock, this.props);
}
}
