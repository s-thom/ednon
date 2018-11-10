import * as React from 'react';
import { stringAppendWithSpace } from 'src/util';

import './index.css';

const {
  useState,
} = React;

interface ICheckboxProps {
  checked: boolean;
  id?: string;
  required?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
  name?: string;
}

export default function Textarea(props: ICheckboxProps) {
  const [checked, setChecked] = useState(props.checked);

  const wrapperClasses = [
    'Checkbox',
  ];

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const val = event.target.checked;
    setChecked(val);

    if (props.onChange) {
      props.onChange(val);
    }
  }

  const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
    checked,
    onChange: changeHandler,
    className: 'Checkbox-input',
    type: 'checkbox',
  };
  if (props.id) {
    inputProps.id = props.id;
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
      <input {...inputProps}/>
      <label htmlFor={props.id} className="Checkbox-label"></label>
    </div>
  );
}
