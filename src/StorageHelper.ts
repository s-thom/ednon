// tslint:disable:no-console
import idb, { DB } from 'idb';

import {
  pReduce,
} from './util';
import { IState, IDefinition } from './types';

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
          break;
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
        widget.data = state;
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

}