import { useState } from 'react';
import Options from '../Options';
import { capitalize } from '../helpers';

// import styles from './fieldset.module.css';

function Fieldset({
  operation,
  element,
  resource,
  name,
  resourceName,
  type,
  required,
  updateData
}) {
  const [inputValue, setInput] = useState('');

  const changeInputValue = (e) => {
    const value = e.target.value;
    setInput(value);
    updateData(resourceName, value);
  };

  let field;
  switch (element) {
    case 'select':
      field = (
        <select
          name={name}
          id={name}
          value={inputValue}
          required={required}
          onChange={changeInputValue}
        >
          <Options name={name} resource={resource} operation={operation} />
        </select>
      );
      break;
    case 'input':
      field = (
        <input
          type={type}
          name={name}
          id={name}
          required={required}
          onChange={changeInputValue}
        ></input>
      );
      break;
    default:
      break;
  }

  return (
    <fieldset>
      <label htmlFor={name}>{capitalize(name)}</label>
      {field}
    </fieldset>
  );
}

export default Fieldset;
