import StorageHelper from './StorageHelper';

export interface IDefinition<State extends IState = IState> {
  id: string;
  type: string;
  data: State;
}

export interface IProps<State extends IState> extends IDefinition<State> {
  storage: StorageHelper;
}

export interface IState {
  // tslint:disable-next-line:no-any
  [x: string]: any;
}

export enum MessageSeverity {
  NONE = 'none',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export interface IDisplayMessage {
  title: string;
  message: string;
  severity: MessageSeverity;
}
