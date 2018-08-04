import * as React from 'react';
import './index.css';
import TextPart from '../../../../part/parts/TextPart';

export default (part: TextPart) => (
  <div className="TextPart">
    {
      part.data.multiline ? (
        <textarea
          id={part.id}
          name={part.id}
          value={part.data.text}
        />
      ) : (
        <input
          type="text"
          id={part.id}
          name={part.id}
          value={part.data.text}
        />
      )
    }
    {
      part.data.label && (
        <label htmlFor={part.id}>{part.data.label}</label>
      )
    }
  </div>
);
