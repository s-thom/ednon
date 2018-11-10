import StorageHelper from './StorageHelper';

export interface IDefinition<State extends IState = IState> {
  id: string;
  type: string;
  data: State;
}

export interface IProps<State extends IState> extends IDefinition<State> {
  // TODO:
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
  id: string;
  title: string;
  message: string;
  severity: MessageSeverity;
  actions?: IDisplayMessageAction[];
}

export interface IDisplayMessageAction {
  text: string;
  onClick: () => void;
}

export interface IWidget {
  title: string;
  component: React.ComponentType<IDefinition>;
  iconPath: string;
}
