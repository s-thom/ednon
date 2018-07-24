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

export interface IPartTemplate {
  /**
   * Identifier for this template
   */
  id: string;
  /**
   * List of Parts that are a child of this template
   */
  children?: string[];
  /**
   * Default state for this part
   */
  state: IPartState;
}

export interface IPartInstanceProps {
  /**
   * Unique identifier for this instance of the part
   */
  id: string;
  /**
   * Internal state of this instance of the part
   */
  state: IPartState;
  /**
   * Any additional props required for this instance (e.g. bound functions (to come later))
   */
  // tslint:disable-next-line:no-any
  [x: string]: any;
}

export interface IPart extends IPartInstanceProps {
  /**
   * Identifier for the template for this part
   */
  template: string;
  /**
   * Unique identifier for this instance of the part
   */
  id: string;
  /**
   * Internal state of this instance of the part
   */
  state: IPartState;
}

type PartSize = 'huge' | 'large' | 'normal' | 'small' | 'tiny';

export interface IPartState {
  size?: PartSize;
}

