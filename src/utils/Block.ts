import EventBus from "./EventBus";
import Handlebars from "handlebars";
import {nanoid} from 'nanoid';


type Props = { [key: string]: unknown };

type MetaProps = {
    tagName: string;
    props: Props;
  };


export default class Block {

    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
      };

      _element: HTMLElement | null  = null;
      _meta: MetaProps;
      _id = nanoid(6);
      eventBus: () => EventBus;
      props: Props;
      children: Record<string, Block>;
      state: { [key: string]: unknown };
      

      constructor(tagName: string, propsAndChildren: Props) {
        const eventBus = new EventBus();
    
        const { children, props } = this._getChildren(propsAndChildren);
        this.children = children;
        this._meta = {
          tagName,
          props,
        };
    
        this.props = this._makePropsProxy({ ...props, id: this._id });
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        this.state = {};
        eventBus.emit(Block.EVENTS.INIT);
      }
    
      private _getChildren(propsAndChildren: Props) {
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
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
      }
      
      private _init() {
        this._createResources();
        this.init();
        this.dispatchComponentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
      }
    
      init() {}
      
      private  _componentDidMount(): void {
        this.componentDidMount();
      }
      
      componentDidMount(): void {}
      
      dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
      }
      
      private _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
          return;
        }
        this._render();
      }
      
      componentDidUpdate(oldProps: Props, newProps: Props) {
        return true;
      }
     
      setProps = (nextProps: Props) => {
        if (!nextProps) {
          return;
        }
        const oldProps = { ...this.props };
        Object.assign(this.props, nextProps);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
      };
    
      get element() {
        return this._element;
      }
      
      private _render() {
        const propsAndStubs = { ...this.props };
    
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`
        });
    
        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;;
    
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);
    
        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            
            const el = child.getContent();

            if (stub && el) {
              stub.replaceWith(el);
            }
          });
          return fragment.content;
      }
      
      render() {}
      
      getContent() {
        return this.element;
      }
    
      private _makePropsProxy(props: Props) {
        return new Proxy(props, {
          get(target: Props, prop: string) {
            const value = target[prop];
            return typeof value === "function" ? value.bind(target) : value;
          },
          set :(target: Props, prop: string, value) => {
            if (target[prop as keyof Props] !== value) {
                target[prop as keyof Props] = value;
                this.eventBus().emit(Block.EVENTS.FLOW_CDU);
              }
              return true;
            },
          deleteProperty() {
            throw new Error("Нет доступа");
          }
        });
      }
      
      _createDocumentElement(tagName:string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
      }
      
      show():void {
        if (this._element) this._element.style.display = "block";
      }
      
      hide(): void {
        if (this._element) this._element.style.display = "none";
      }
      }
