import StorageHelper from '../StorageHelper';
import Part from './Part';

const DEFAULT_TYPES = {
};

export default class PartFactory {
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

  async getPartById(id: string) {
    if (this.partMap.has(id)) {
      return this.partMap.get(id);
    }

    const partDefinition = await this.storageHelper.getPartDefinition(id);
    const partType = this.typeMap.get(partDefinition.type);
    if (!partType) {
      throw new Error(`Unable to create part with type ${partDefinition.type}: no type was found in the map`);
    }
    const part: Part = new (partType as any)(partDefinition);
    this.partMap.set(id, part);
    return part;
  }
}
