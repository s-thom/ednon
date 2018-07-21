import * as React from 'react';
import StorageHelper from '../../StorageHelper';

export const {
  Provider: StorageProvider,
  Consumer: StorageConsumer,
// tslint:disable-next-line:no-any
} = React.createContext<StorageHelper>(null as any);
