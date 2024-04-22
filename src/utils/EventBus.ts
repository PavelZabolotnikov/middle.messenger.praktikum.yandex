interface Callback {
    (...args: Record<string, unknown>[]): void;
  }

export default class EventBus {
    private listeners: Record<string, Callback[]>;
    constructor() {
        this.listeners = {};
    }
    on(event:string, callback: Callback): void  {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }
    off(event: string, callback: Callback): void  {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }
        this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
    }
    emit(event: string, ...args: Record<string, unknown>[]): void {
        const eventListeners = this.listeners[event];
        if (!eventListeners) {
          throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}