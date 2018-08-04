import FakeEventTarget from '../FakeEventTarget';

export interface IPartDefinition<Data> {
  type: string;
  id: string;
  data: Data;
}

// tslint:disable-next-line:no-empty-interface
interface IPartData {}

interface IPartDataEvent {
  id: string;
  newData: IPartData;
}

interface IPartEvents {
  data: IPartDataEvent;
}

export default abstract class Part<Data extends IPartData = IPartData, Events extends IPartEvents = IPartEvents> extends FakeEventTarget<Events> {
  protected definition: IPartDefinition<Data>;

  constructor(definition: IPartDefinition<Data>) {
    super();

    this.definition = definition;
  }

  abstract clone(): Part<Data, Events>;
}
