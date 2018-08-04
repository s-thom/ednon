// tslint:disable:no-console
import idb, { DB } from 'idb';

import {
  pReduce,
} from './util';
import { IState, IDefinition } from './types';
import { IPartDefinition } from './part/Part';

interface IUpgrade {
  from: number;
  to: number;
  fn: () => IDBTransaction;
}

// tslint:disable-next-line:no-any
const IndexedDB: IDBFactory = window.indexedDB || (window as any).mozIndexedDB || (window as any).webkitIndexedDB || (window as any).msIndexedDB;

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
        // tslint:disable-next-line:no-switch-case-fall-through switch-final-break
        case 1:
          db.createObjectStore('parts', {
            keyPath: 'id',
          });
          db.createObjectStore('visible', {
            keyPath: 'id',
          });
      }
    });
  }

  ready() {
    return this.dbPromise.then(
      () => true,
      (err) => {
        console.error(err);
        return false;
      },
    );
  }

  newWidget(def: IDefinition) {
    return this.dbPromise
      .then(db => db.transaction(['widgets'], 'readwrite'))
      .then(async (transaction) => {
        const store = transaction.objectStore('widgets');
        return store.add(def);
      });
  }

  saveWidgetState(widgetId: string, state: IState) {
     return this.dbPromise
      .then(db => db.transaction(['widgets'], 'readwrite'))
      .then(async (transaction) => {
        const store = transaction.objectStore('widgets');
        const widget = await store.get(widgetId);
        try {
          widget.data = state;
        } catch (err) {
          console.error(`Tried to update state of widget ${widgetId}, but it does not exist`);
          return null;
        }
        return store.put(widget);
      });
  }

  getAllWidgets() {
    return this.dbPromise
      .then(db => db.transaction(['widgets'], 'readonly'))
      .then(async (transaction) => {
        const store = transaction.objectStore('widgets');
        const widgets = await store.getAll();
        console.log(widgets);
        return widgets;
      });
  }

  removeWidget(widgetId: string) {
    return this.dbPromise
      .then(db => db.transaction(['widgets'], 'readwrite'))
      .then(async (transaction) => {
        const store = transaction.objectStore('widgets');
        await store.delete(widgetId);
        return;
      });
  }

  getPartDefinition(id: string) {
    return this.dbPromise
      .then(db => db.transaction(['widgets'], 'readonly'))
      .then(async (transaction) => {
        const store = transaction.objectStore('widgets');
        // tslint:disable-next-line:no-any
        const part: IPartDefinition<any> = await store.get(id);
        console.log(part);
        return part;
      });
  }

}
