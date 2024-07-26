import { expect } from 'chai';
import 'mocha';
import Router from './Router';
import Block from '../block/Block';

describe('Router', () => {
  let TestBlock: typeof Block;

  beforeEach(() => {
    class TestComponent extends Block {
      constructor() {
        super('div', {});
      }

      render() {
        return document.createDocumentFragment();
      }
    }

    TestBlock = TestComponent;
  });

  it('should add a route using the use method', () => {
    Router.use('/', () => new TestBlock('div', {}));
    Router.go('/');
    expect(window.history.length).to.equal(2);
    expect(Router._currentRoute).to.not.be.null;
  });

  it('should navigate to a route using the go method', () => {
    Router.use('/', () => new TestBlock('div', {}));
    Router.go('/');
    expect(Router._currentRoute).to.not.be.null;
  });

  it('should navigate back using the back method', () => {
    Router.use('/start', () => new TestBlock('div', {}));
    Router.go('/test');
    Router.back();
    expect(window.location.pathname).to.equal('/test');
  });

  it('should navigate forward using the forward method', () => {
    Router.use('/test', () => new TestBlock('div', {}));
    Router.go('/finish');
    Router.back();
    Router.forward();
    expect(window.location.pathname).to.equal('/finish');
  });
});
