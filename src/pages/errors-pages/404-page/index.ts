import ClientErrorPageBlock from './404-error-page.hbs?raw';
import PageLink from '../../../components/link';
import Block from '../../../utils/Block';
import Router from '../../../utils/router/Router';
import '../error-pages.scss';

export class ClientErrorPage extends Block {
  constructor(props: { name?: string }) {
    super('div', { ...props });
  }

  render() {
    this.children = {
        PageLink: new PageLink({
        attr: {
          class: 'link',
        },
        events: { click: () => Router.back() },
        text: 'Назад к чатам',
      }),
    };

    return this.compile(ClientErrorPageBlock, this.props);
}
}
