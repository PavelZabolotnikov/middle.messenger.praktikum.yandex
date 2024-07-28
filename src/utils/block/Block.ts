import EventBus from '../../utils/EventBus';
import Handlebars from 'handlebars';

type Props = { events?: Record<string, EventListener>; attr?: Record<string, string>; [key: string | symbol]: unknown };

type MetaProps = {
  tag: string;
  props: Props;
};

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  _element: HTMLElement | null = null;
  children: Record<string, Block>;
  _meta: MetaProps;
  props: Props;
  state: { [key: string]: unknown };
  eventBus: () => EventBus;
  id: string = Math.floor(100000 + Math.random() * 900000).toString();

  constructor(tag: string, propsAndChildren: Props) {
    const eventBus = new EventBus();

    const { children, props } = this._getChildren(propsAndChildren);
    this.children = children;
    this._meta = {
      tag,
      props,
    };

    this.props = this._makePropsProxy({ ...props });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    this.state = {};
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildren(propsAndChildren: Props) {
    const { children, props } = Object.entries(propsAndChildren).reduce(
      (acc, [key, value]) => {
        if (value instanceof Block) {
          acc.children[key as string] = value;
        } else {
          acc.props[key] = value;
        }
        return acc;
      },
      { children: {} as typeof this.children, props: {} as Props },
    );

    return { children, props };
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tag } = this._meta;
    this._element = this._createDocumentElement(tag);
  }

  private _init() {
    this._createResources();
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    this.dispatchComponentDidMount();
  }
  init() {}

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount(): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return oldProps !== newProps;
  }

  setProps(nextProps: Props): void {
    if (!nextProps) {
      return;
    }
    const oldProps = { ...this.props };
    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
  }

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render() {
    const block: unknown = this.render();
    this._removeEvents();
    if (this._element) {
      this._element.innerHTML = '';
      this._element.appendChild(block as Node);
      this._addEvents();
      this._addAttributes();
    }
  }
  setClassName(className?: string | unknown) {
    if (typeof className === 'string') {
      const classNames = (className as string).split(/\s+/);
      classNames.forEach((token) => {
        this._element?.classList.add(token);
      });
    }
  }
  protected compile(template: string, props: Props, className?: string | unknown) {
    const propsAndStubs: Record<string, unknown> = { ...props };
    this.setClassName(className);
    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((item) => `<div data-id="${item.id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const replaceChildContent = (child: Block) => {
        const content = fragment.content;
        const stub = content.querySelector(`[data-id="${child.id}"]`);

        const el = child.getContent();

        if (stub && el) {
          stub.replaceWith(el);
        }
      };

      if (Array.isArray(child)) {
        child.forEach(replaceChildContent);
      } else {
        replaceChildContent(child);
      }
    });

    return fragment.content;
  }

  render() {}

  getContent(): HTMLElement | null {
    return this.element;
  }
  private _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop] as string;
        return typeof value === 'function' ? (value as CallableFunction).bind(target) : value;
      },
      set(target, prop, value) {
        if (target[prop] !== value) {
          target[prop] = value;
        }
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  private _createDocumentElement(tag: string): HTMLElement {
    const element = document.createElement(tag);
    element.setAttribute('data-id', this.id);

    return element;
  }

  private _addAttributes() {
    const { attr } = this.props;
    if (attr && typeof attr === 'object') {
      Object.entries(attr).forEach(([key, value]) => {
        this._element?.setAttribute(key, value as string);
      });
    }
  }

  private _addEvents(): void {
    const { events } = this.props;

    if (events) {
      Object.entries(events).forEach(([eventName, callback]) => {
        this._element?.addEventListener(eventName, callback);
      });
    }
  }

  private _removeEvents(): void {
    const { events } = this.props;
    if (events) {
      Object.entries(events).forEach(([eventName, callback]) => {
        this._element?.removeEventListener(eventName, callback);
      });
    }
  }

  show(): void {
    if (this._element) this._element.style.display = 'block';
  }

  hide(): void {
    if (this._element) this._element.style.display = 'none';
  }
}

export default Block;
