import { IDisplayMessage, MessageSeverity, IDisplayMessageAction } from './types';
import { generateId } from './util';

type HandleFunction = (message: IDisplayMessage) => void;

export default class MessageHelper {
  private static instance: MessageHelper;

  private animFrameHandle: number;
  private functions: HandleFunction[];

  static getInstance() {
    if (!this.instance) {
      this.instance = new MessageHelper();
    }

    return this.instance;
  }

  constructor() {
    this.functions = [];
  }

  addListener(fn: HandleFunction) {
    const index = this.functions.indexOf(fn);
    if (index > -1) {
      throw new Error('Handler already added');
    }

    this.functions.push(fn);
  }

  removeListener(fn: HandleFunction) {
    const index = this.functions.indexOf(fn);
    if (index === -1) {
      throw new Error('Handler already removed');
    }

    this.functions.splice(index, 1);
  }

  send(severity: MessageSeverity, title: string, message: string, actions: IDisplayMessageAction[] = []) {
    const newMesage: IDisplayMessage = {
      id: generateId(),
      severity,
      title,
      message,
      actions,
    };

    this.functions.forEach((fn) => {
      try {
        fn(newMesage);
      } catch (err) {
        console.error('Error in message handler function');
      }
    });
  }
}
