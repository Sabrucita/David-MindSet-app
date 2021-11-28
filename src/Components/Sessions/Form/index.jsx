import { useState } from 'react';
import Fieldset from '../Fieldset';
import styles from './form.module.css';
const url = process.env.REACT_APP_API;

function Form({ operation }) {
  operation = 'create';

  const [formData, setFormData] = useState({});

  const submitForm = (e) => {
    e.preventDefault();
    console.log('submit');
    console.log(formData);
    fetch(`${url}/sessions`, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(async (res) => {
        const data = await res.json();
        console.log('successful', data);
        //requestSuccessful(data, 'created');
      })
      .catch((err) => {
        console.log('error', err);
        //displayError(err);
      });
  };

  const updateForm = (field, value) => {
    const newState = formData;
    newState[field] = value;
    setFormData(newState);
  };

  return (
    <div>
      {operation === 'create' ? <h2>Create Session</h2> : <h2>Edit Session</h2>}
      <form className={styles.form} onSubmit={submitForm}>
        <Fieldset
          operation={operation}
          element="select"
          resource="candidates"
          name="candidate"
          resourceName="idCandidate"
          required
          updateData={updateForm}
        />
        <Fieldset
          operation={operation}
          element="select"
          resource="psychologists"
          name="psychologist"
          resourceName="idPsychologists"
          required
          updateData={updateForm}
        />
        <Fieldset
          operation={operation}
          element="input"
          name="date"
          resourceName="date"
          type="datetime-local"
          required
          updateData={updateForm}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
