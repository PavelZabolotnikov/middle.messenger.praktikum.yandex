import Block from '../block/Block';
import { renderDOM } from '../renderDOM/RenderDOM';

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

class Route {
  _blockClass: () => Block;
  _pathname: string;
  _block: Block | null;
  _props: Record<string, unknown>;
  constructor(pathname: string, _blockClass: () => Block, props: Record<string, unknown>) {
    this._pathname = pathname;
    this._block = null;
    this._props = props;
    this._blockClass = _blockClass;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass();
      renderDOM(this._props.rootQuery as string, this._block);
      return;
    }

    this._block.show();
  }
}

export default Route;
