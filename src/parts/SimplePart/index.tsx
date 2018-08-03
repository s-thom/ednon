import * as React from 'react';
import { IPartInstanceProps, IPartState } from '../../types';
import Part from '../Part';

export default abstract class SimplePart<State extends IPartState = IPartState> extends Part<IPartInstanceProps, State> {}
