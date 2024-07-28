import { expect } from 'chai';
import Block from './Block.ts';
import Sinon from 'sinon';

describe('Block test', () => {
  let TestBlock: typeof Block;

  before(() => {
    class TestComponent extends Block {
      constructor(tagname: string, props: { text: string }) {
        super(tagname, props);
      }
      render() {
        const fragment = document.createDocumentFragment();
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.id = 'test';
        p.innerHTML = String(this.props.text);
        div.appendChild(p);
        fragment.appendChild(div);
        return fragment;
      }
    }
    TestBlock = TestComponent;
  });

  it('should have the correct tag', () => {
    const block = new TestBlock('div', {});
    expect(block._meta.tag).to.equal('div');
  });

  it('should show the element', () => {
    const block = new TestBlock('div', {});
    block.show();
    expect(block.element?.style.display).to.equal('block');
  });

  it('should hide the element', () => {
    const block = new TestBlock('div', {});
    block.hide();
    expect(block.element?.style.display).to.equal('none');
  });

  it('should create a component using Block.ts', () => {
    const text = 'Hello';
    const block = new TestBlock('div', { text });
    const spanText = block.getContent()?.querySelector('#test')?.innerHTML;
    expect(spanText).to.equal(text);
  });

  it('should create a component with one prop', () => {
    const text = 'Hello';
    const block = new TestBlock('div', { text });

    const content = block.getContent();

    expect(content?.outerHTML).to.eq(`<div data-id="${block.id}"><div><p id="test">Hello</p></div></div>`);
  });

  it('should create a component with className', () => {
    const className: string = 'GreatClassName';
    const block = new TestBlock('div', { text: 'Hello', className: className });
    block.setClassName(className);
    const content = block.getContent();

    expect(content?.outerHTML).to.eq(
      `<div data-id="${block.id}" class="GreatClassName"><div><p id="test">Hello</p></div></div>`,
    );
  });

  it('should change its state', () => {
    const text = 'new value';
    const block = new TestBlock('div', { text: 'Hello' });
    block.setProps({ text });
    const spanText = block.getContent()?.querySelector('#test')?.innerHTML;
    expect(spanText).to.equal(text);

    const content = block.getContent();
    expect(content?.outerHTML).to.eq(`<div data-id="${block.id}"><div><p id="test">new value</p></div></div>`);
  });

  it('should set events on the element', () => {
    const handlerStub = Sinon.stub();
    const block = new TestBlock('div', {
      events: {
        click: handlerStub,
      },
      text: 'Click',
    });
    const event = new (document.defaultView || window).MouseEvent('click');
    block.getContent()?.dispatchEvent(event);
    expect(handlerStub.calledOnce).to.be.true;
  });
});
