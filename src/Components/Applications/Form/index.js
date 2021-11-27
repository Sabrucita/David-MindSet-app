import { useState } from 'react';
import Input from '../Input';
import styles from './form.module.css';

function Form() {
  const [nameValue, setNameValue] = useState('');

  const onChangeNameInput = (event) => {
    setNameValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // const url = `${process.env.REACT_APP_API}/applications/${clientId}`;
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <h2>Form</h2>
        <Input
          id="name"
          name="name"
          placeholder="your name"
          value={nameValue}
          onChange={onChangeNameInput}
          required
        />
      </form>
    </div>
  );
}

export default Form;
