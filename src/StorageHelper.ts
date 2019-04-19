// tslint:disable:no-console
import idb, {
  DB,
} from 'idb';

import {
  IDefinition,
  IState,
} from './types';

const DB_NAME = 'ednon';
const DB_VERSION = 1;

export default class StorageHelper {
  private static instance: StorageHelper;
  private readonly dbPromise: Promise<DB>;

  static getInstance() {
    if (!this.instance) {
      this.instance = new StorageHelper();
    }

    return this.instance;
  }

  constructor() {
    this.dbPromise = idb.open(DB_NAME, DB_VERSION, (db) => {
      switch (db.oldVersion) {
        // NOTE: Lack of breaks inbetween cases is intentional
        case 0:
          db.createObjectStore('widgets', {
            keyPath: 'id',
          });
          break;
      }
    });
  }

  async ready() {
    try {
      await this.dbPromise;
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  }

  async newWidget(def: IDefinition) {
    const db = await this.dbPromise;
    const transaction = db.transaction(['widgets'], 'readwrite');
    const store = transaction.objectStore('widgets');
    return store.add(def);
  }

  async saveWidgetState(widgetId: string, state: IState) {
    const db = await this.dbPromise;
    const transaction = db.transaction(['widgets'], 'readwrite');
    const store = transaction.objectStore('widgets');
    const widget = await store.get(widgetId);
    try {
      widget.data = state;
    } catch (err) {
      console.error(`Tried to update state of widget ${widgetId}, but it does not exist`);
      return null;
    }
    return store.put(widget);
  }

  // tslint:disable-next-line:no-any
  async saveWidgetKey(widgetId: string, key: string, value: any) {
    const db = await this.dbPromise;
    const transaction = db.transaction(['widgets'], 'readwrite');
    const store = transaction.objectStore('widgets');
    const widget = await store.get(widgetId);
    try {
      if (widget.data) {
        widget.data[key] = value;
      }
    } catch (err) {
      console.error(`Tried to update state of widget ${widgetId}, but it does not exist`);
      return null;
    }
    return store.put(widget);
  }

  async getAllWidgets(): Promise<IDefinition[]> {
    const db = await this.dbPromise;
    const transaction = db.transaction(['widgets'], 'readonly');
    const store = transaction.objectStore('widgets');
    const widgets = await store.getAll();
    return widgets;
  }

  async removeWidget(widgetId: string) {
    const db = await this.dbPromise;
    const transaction = db.transaction(['widgets'], 'readwrite');
    const store = transaction.objectStore('widgets');
    await store.delete(widgetId);
  }

}
