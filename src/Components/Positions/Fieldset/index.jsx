import { useState, useEffect } from 'react';
import Options from '../Options';
import { capitalize } from '../helpers';

function Fieldset({
  operation,
  currentId,
  element,
  resource,
  name,
  resourceName,
  type,
  required,
  updateData
}) {
  const [inputValue, setInputValue] = useState('');

  const changeInputValue = (e) => {
    let value = e.target.value;
    setInputValue(value);
    updateData(resourceName, value);
  };

  useEffect(() => {
    if (operation === 'update' && !inputValue) {
      setInputValue(currentId);
      updateData(resourceName, currentId);
    }
  });

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
          value={inputValue}
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
