import ServerErrorPageBlock from './500-error-page.hbs?raw';
import PageLink from '../../../components/link';
import Block from '../../../utils/Block';
import Router from '../../../utils/router/Router';

export class ServerErrorPage extends Block {
  constructor(props: { name?: string }) {
    super('div', { ...props });
  }

  render() {
    this.children = {
        PageLink: new PageLink({
        attr: {
          class: 'link',
        },
        text: 'Назад к чатам',
        events: { click: () => Router.back() },
      }),
    };

    return this.compile(ServerErrorPageBlock, this.props);
  }
}
