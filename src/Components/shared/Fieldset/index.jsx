import { useState, useEffect } from 'react';
import Options from '../Options';
import { capitalize } from '../../../helpers';
import styles from './fieldset.module.css';

function Fieldset({
  update,
  currentValue,
  element,
  name,
  displayedName,
  objectProperty,
  inputType,
  required,
  updateData,
  options
}) {
  const [inputValue, setInputValue] = useState('');

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
          <Options name={name} update={update} options={options} />
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
    <fieldset className={styles.fieldset}>
      <label htmlFor={name}>{capitalize(displayedName || name)}</label>
      {field}
    </fieldset>
  );
}

export default Fieldset;
