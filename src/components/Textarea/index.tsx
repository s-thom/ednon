import * as React from 'react';
import {
  stringAppendWithSpace,
} from '../../util';

import './index.css';

const {
  useState,
} = React;

interface ITextareaProps {
  value: string;
  id?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
}

export default function Textarea(props: ITextareaProps) {
  const [value, setValue] = useState(props.value);

  const wrapperClasses = [
    'Textarea',
  ];
  if (value) {
    wrapperClasses.push('has-value');
  }

  function changeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const val: string = event.target.value;
    setValue(val);

    if (props.onChange) {
      props.onChange(val);
    }
  }

  const inputProps: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {
    value,
    onChange: changeHandler,
    className: 'Textarea-input',
  };
  if (props.id) {
    inputProps.id = props.id;
  }
  if (props.placeholder) {
    inputProps.placeholder = props.placeholder;
  }
  if (props.name) {
    inputProps.name = props.name;
  }
  if (props.required) {
    inputProps.required = props.required;
  }

  const wrapperClass = stringAppendWithSpace(wrapperClasses.join(' '), props.className);

  return (
    <div className={wrapperClass}>
      <textarea {...inputProps} />
    </div>
  );
}
