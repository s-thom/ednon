import StorageHelper from '../StorageHelper';
import Part from './Part';
import {
  generateId,
} from '../util';
import FakeEventTarget from '../FakeEventTarget';
import TextPart from './parts/TextPart';
import ButtonPart from './parts/ButtonPart';
import LayoutPart from './parts/LayoutPart';

interface IPartFactoryEvents {

}

const DEFAULT_TYPES = {
  [TextPart.type]: TextPart,
  [ButtonPart.type]: ButtonPart,
  [LayoutPart.type]: LayoutPart,
};

export default class PartFactory extends FakeEventTarget<IPartFactoryEvents> {
  private static instance: PartFactory;
  private storageHelper = StorageHelper.getInstance();
  private partMap: Map<string, Part> = new Map();
  private typeMap: Map<string, typeof Part> = new Map();

  static getInstance() {
    if (!this.instance) {
      this.instance = new PartFactory();
    }

    return this.instance;
  }

  constructor() {
    super();

    Object.keys(DEFAULT_TYPES)
      .forEach(key => this.typeMap.set(key, DEFAULT_TYPES[key]));
  }

  // tslint:disable-next-line:prefer-function-over-method
  generateId() {
    return generateId();
  }

  async getPartById(id: string) {
    if (this.partMap.has(id)) {
      return this.partMap.get(id);
    }

    const partDefinition = await this.storageHelper.getPartDefinition(id);
    const partType = this.typeMap.get(partDefinition.type);
    if (!partType) {
      throw new Error(`Unable to create part with type ${partDefinition.type}: no type was found in the map`);
    }
    // tslint:disable-next-line:no-any
    const part: Part = new (partType as any)(partDefinition);
    this.partMap.set(id, part);
    return part;
  }
}
