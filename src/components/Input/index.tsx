import * as React from 'react';
import { stringAppendWithSpace } from 'src/util';

import './index.css';

const {
  useState,
} = React;

interface IInputProps {
  value: string;
  id?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: RegExp;
  onChange?: (value: string) => void;
  className?: string;
  name?: string;
}

export default function Input(props: IInputProps) {
  const [value, setValue] = useState(props.value);

  const wrapperClasses = [
    'Input',
  ];
  if (value) {
    wrapperClasses.push('has-value');
  }

  let label;
  if (props.label) {
    const labelProps: React.LabelHTMLAttributes<HTMLLabelElement> = {
      className: 'Input-label',
    };
    if (props.id) {
      labelProps.id = props.id;
    }

    label = (
      <label {...labelProps}>{props.label}</label>
    );
    wrapperClasses.push('has-label');
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const val: string = event.target.value;
    setValue(val);

    if (props.onChange) {
      props.onChange(value);
    }
  }

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    value,
    type: 'text',
    onInput: changeHandler,
    className: stringAppendWithSpace('Input-input', props.className),
  };
  if (props.id) {
    inputProps.id = props.id;
  }
  if (props.pattern) {
    inputProps.pattern = props.pattern.source;
  }
  if (props.placeholder) {
    inputProps.placeholder = props.placeholder;
  }
  if (props.placeholder) {
    inputProps.placeholder = props.placeholder;
  }
  if (props.name) {
    inputProps.name = props.name;
  }

  let requiredIndicator;
  if (props.required) {
    inputProps.required = props.required;
    requiredIndicator = (
      <span className="Input-required" aria-label="Required">*</span>
    );
  }

  return (
    <div className={wrapperClasses.join(' ')}>
      <input {...inputProps} />
      {label}
      {requiredIndicator}
    </div>
  );
}
