import { useState, useEffect } from 'react';
import Options from '../Options';
import { capitalize } from '../../helpers';

function Fieldset({
  update,
  currentValue,
  element,
  resource,
  name,
  displayedName,
  objectProperty,
  inputType,
  required,
  updateData
}) {
  const [inputValue, setInputValue] = useState('');
  console.log(currentValue);
  const changeInputValue = (e) => {
    if (inputType === 'checkbox') {
      setInputValue(!inputValue);
      return updateData(objectProperty, !inputValue);
    }
    let value = e.target.value;
    setInputValue(value);
    updateData(objectProperty, value);
  };

  useEffect(() => {
    setInputValue(currentValue);
  }, [currentValue]);

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
          <Options name={name} resource={resource} update={update} />
        </select>
      );
      break;
    case 'input':
      field = (
        <input
          type={inputType}
          name={name}
          id={name}
          value={inputValue}
          required={required}
          onChange={changeInputValue}
          checked={inputValue}
        ></input>
      );
      break;
    default:
      break;
  }

  return (
    <fieldset>
      <label htmlFor={name}>{capitalize(displayedName || name)}</label>
      {field}
    </fieldset>
  );
}

export default Fieldset;
