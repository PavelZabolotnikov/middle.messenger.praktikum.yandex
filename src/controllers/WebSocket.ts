import store from '../store/store';
import WebSocketUtil, { WSEvents } from '../utils/WebSockets/WebSockets';

export interface Message {
  chat_id: number;
  time: string;
  type: string;
  user_id: number;
  content: string;
}

class MessageController {
  private sockets: Map<number, WebSocketUtil> = new Map();

  async connect(id: number, token: string) {
    try {
      if (this.sockets.has(id)) {
        return;
      }
      const userId = store.getState().user.id;
      const ws = new WebSocketUtil(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);
      this.sockets.set(id, ws);

      await ws.connect();
      this.subscribe(ws, id);
      this.getPreviusMessage(id);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  sendMessage(id: number, message: string) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({
      type: 'message',
      content: message,
    });
  }

  private getPreviusMessage(id: number) {
    const socket = this.sockets.get(id);

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({ type: 'get old', content: '0' });
  }

  closeAll() {
    Array.from(this.sockets.values()).forEach((socket) => socket.close());
  }

  private onMessage(messages: Message | Message[]) {
    let messagesToAdd: Message[] = [];
    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }
    const currentMessages = store.getState().messages as Message[];
    messagesToAdd = [...currentMessages, ...messagesToAdd];
    store.set(`messages`, messagesToAdd);
  }

  private onClose(id: number) {
    this.sockets.delete(id);
  }

  private subscribe(transport: WebSocketUtil, id: number) {
    transport.on(WSEvents.message, (message: unknown) => this.onMessage(message as Message));
    transport.on(WSEvents.close, () => this.onClose(id));
  }
}

export default new MessageController();
