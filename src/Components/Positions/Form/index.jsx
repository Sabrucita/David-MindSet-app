import { useState, useEffect } from 'react';
import Fieldset from '../Fieldset';
import styles from './form.module.css';
const url = process.env.REACT_APP_API;

function Form({ operation, id }) {
  const [formData, setFormData] = useState({});
  const [currentCompany, setCurrentCompany] = useState('');
  const [currentStartDate, setCurrentStartDate] = useState('');
  const [currentEndDate, setCurrentEndDate] = useState('');
  const [currentJobDescription, setCurrentJobDescription] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    if (operation === 'create') {
      fetch(`${url}/open-positions`, {
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
    }

  const updateForm = (field, value) => {
    const newState = formData;
    newState[field] = value;
    setFormData(newState);
  };

  return (
    <div>
      {operation === 'create' ? <h2>Create Position</h2> : <h2>Edit Position</h2>}
      <form className={styles.form} onSubmit={submitForm}>
        <Fieldset
          operation={operation}
          currentId={currentCompany}
          element="select"
          resource="candidates"
          name="candidate"
          resourceName="idCandidate"
          required
          updateData={updateForm}
        />
        <Fieldset
          operation={operation}
          currentId={currentStartDate.substr(0, 16)}
          element="input"
          name="startDate"
          resourceName="startDate"
          type="datetime-local"
          required
          updateData={updateForm}
        />
        <Fieldset
          operation={operation}
          currentId={currentEndDate.substr(0, 16)}
          element="input"
          name="endDate"
          resourceName="endDate"
          type="datetime-local"
          required
          updateData={updateForm}
        />
        <Fieldset
          operation={operation}
          currentId={currentJobDescription}
          element="input"
          name="jobDescription"
          resourceName="jobDescription"
          type="text"
          required
          updateData={updateForm}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
