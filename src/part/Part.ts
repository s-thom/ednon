import FakeEventTarget from '../FakeEventTarget';

export interface IPartDefinition<Data> {
  type: string;
  id: string;
  data: Data;
}

// tslint:disable-next-line:no-empty-interface
interface IPartData {}

export interface IPartDataEvent {
  id: string;
  newData: IPartData;
}

interface IPartEvents {
  data: IPartDataEvent;
}

export default abstract class Part<Data extends IPartData = IPartData, Events extends IPartEvents = IPartEvents> extends FakeEventTarget<Events> {
  private definition: IPartDefinition<Data>;

  constructor(definition: IPartDefinition<Data>) {
    super();

    this.definition = definition;
  }

  static get type(): string {
    throw new Error('Part does not define a type');
  }

  get type() {
    return this.definition.type;
  }

  get id() {
    return this.definition.id;
  }

  get data() {
    return this.definition.data;
  }

  // abstract clone(): Part<Data, Events>;
}
