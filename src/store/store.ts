import { Message } from '../controllers/WebSocket';
import EventBus from '../utils/EventBus';
import { set } from '../../src/utils/helpers/set';

export enum StoreEvents {
  Updated = 'updated',
}

interface Chat {
  last_message: { time: string };
}
interface StoreProps {
  user: { id: number };
  chats: Chat[];
  currentChat: unknown;
  messages: Message[] | null;
}
class Store extends EventBus {
  private state: StoreProps = {
    user: { id: 0 },
    chats: [],
    currentChat: null,
    messages: [],
  };
  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    this.emit(StoreEvents.Updated);
  }
  public getState() {
    console.log(this.state);
    return this.state;
  }
}
const store = new Store();
export default store;
