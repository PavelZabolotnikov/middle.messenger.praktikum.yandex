import EventBus from '../EventBus';

export enum WSEvents {
  open = 'open',
  message = 'message',
  error = 'error',
  close = 'close',
}

export default class WebSockets extends EventBus {
  private url: string;
  private socket?: WebSocket;
  private ping?: ReturnType<typeof setInterval>;

  constructor(url: string) {
    super();
    this.url = url;
  }

  connect() {
    if (this.socket) {
      throw new Error('Уже подключено');
    }

    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on(WSEvents.error, reject);
      this.on(WSEvents.open, () => {
        this.off(WSEvents.error, reject);
        resolve('Подключено');
      });
    });
  }

  close() {
    if (!this.socket) {
      return;
    }
    this.send({ type: 'Соединеник закрыто' });
    this.socket.close();

    clearInterval(this.ping);
    this.ping = undefined;
  }

  private setupPing() {
    this.ping = setInterval(() => {
      this.send({ type: 'ping' });
    }, 5000);

    this.on(WSEvents.close, () => {
      clearInterval(this.ping);
      this.ping = undefined;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSEvents.open);
    });

    socket.addEventListener('close', () => {
      this.emit(WSEvents.close);
    });

    socket.addEventListener('error', (event) => {
      this.emit(WSEvents.error, { error: event });
    });

    socket.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);
      if (['pong', 'user connected'].includes(data?.type)) {
        return;
      }
      this.emit(WSEvents.message, data);
    });
  }

  send(data: string | number | object) {
    if (!this.socket) {
      throw new Error('Not connected');
    }

    this.socket.send(JSON.stringify(data));
  }
}
