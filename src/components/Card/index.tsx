import * as React from 'react';

import './index.css';
import {
  stringAppendWithSpace,
} from '../../util';

interface ICardProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Card(props: ICardProps) {
  return (
    <div className={stringAppendWithSpace('Card', props.className)}>
      {props.children}
    </div>
  );
}
