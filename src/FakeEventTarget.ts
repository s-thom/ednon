interface IEventTypeDefinitions {
  // tslint:disable-next-line:no-any
  [name: string]: any;
}

type HandleFunction<EventTypes extends IEventTypeDefinitions, EventName extends keyof EventTypes> = (obj?: EventTypes[EventName]) => void;

interface IHandle<EventTypes extends IEventTypeDefinitions, EventName extends keyof EventTypes> {
  event: EventName;
  fn: HandleFunction<EventTypes, EventName>;
}

export default abstract class FakeEventTarget<EventTypes extends IEventTypeDefinitions> {
  private handles: IHandle<EventTypes, keyof EventTypes>[] = [];

  fire<EventName extends keyof EventTypes>(event: EventName, obj: EventTypes[EventName]) {
    const toFire = this.handles.filter(h => h.event === event);
    toFire.forEach((handle) => {
      try {
        handle.fn(obj);
      } catch (err) {
        console.error(`Handle for event ${event} threw an error`, err);
      }
    });
  }

  on<EventName extends keyof EventTypes>(event: EventName, fn: HandleFunction<EventTypes, EventTypes[EventName]>) {
    const existingIndex = this.handles.findIndex(h => h.event === event && h.fn === fn);
    if (existingIndex > -1) {
      throw new Error(`Handle for ${event} already exists`);
    }

    this.handles.push({
      event,
      fn,
    });
  }

  off<EventName extends keyof EventTypes>(event: EventName, fn: HandleFunction<EventTypes, EventTypes[EventName]>) {
    const existingIndex = this.handles.findIndex(h => h.event === event && h.fn === fn);
    if (existingIndex === -1) {
      throw new Error(`Handle for ${event} doesn't exist`);
    }

    this.handles.splice(existingIndex, 1);
  }
}
