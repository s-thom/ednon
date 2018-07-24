import * as React from 'react';
import { IPartInstanceProps, IPartState } from '../../types';

export default class SimplePart<State extends IPartState = IPartState> extends React.Component<IPartInstanceProps, State> {}
