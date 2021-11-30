import { useState, useEffect } from 'react';
import Fieldset from '../Fieldset';
import Modal from '../Modal';
import styles from './form.module.css';
const url = process.env.REACT_APP_API;

function Form() {
  const [formData, setFormData] = useState({});
  const [currentCompany, setCurrentCompany] = useState('');
  const [currentStartDate, setCurrentStartDate] = useState('');
  const [currentEndDate, setCurrentEndDate] = useState('');
  const [currentJobDescription, setCurrentJobDescription] = useState('');
  const [modalContent, setModalContent] = useState();
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    if (operation === 'update') {
      fetch(`${url}/open-positions/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setCurrentCompany(data.data.idCompany);
          setCurrentStartDate(data.data.startDate.substr(0, 10));
          setCurrentEndDate(data.data.endDate.substr(0, 10));
          setCurrentJobDescription(data.data.jobDescription);
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (formData.jobDescription.length < 10 || formData.jobDescription.length > 500) {
      setShowModal(true);
      setModalType('error');
      setModalContent({ msg: 'Job description must be between 10 and 500 characters' });
      return;
    }
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
          setShowModal(true);
          setModalType('create');
          setModalContent(data.data);
        })
        .catch(() => {
          setShowModal(true);
          setModalType('error');
        });
    } else {
      fetch(`${url}/open-positions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          const data = await res.json();
          setShowModal(true);
          setModalType('create');
          setModalContent(data.data);
        })
        .catch(() => {
          setShowModal(true);
          setModalType('error');
        });
    }
  };

  const updateForm = (field, value) => {
    const newState = formData;
    newState[field] = value;
    setFormData(newState);
  };

  const closeModalFn = () => {
    setShowModal(false);
    if (modalType !== 'error') window.location.href = '/positions';
  };

  return (
    <div>
      {operation === 'create' ? <h2>Create Position</h2> : <h2>Edit Position</h2>}
      <form className={styles.form} onSubmit={submitForm}>
        <Fieldset
          operation={operation}
          currentId={currentCompany}
          element="select"
          resource="companies"
          name="company"
          resourceName="idCompany"
          required
          updateData={updateForm}
        />
        <Fieldset
          operation={operation}
          currentId={currentStartDate.substr(0, 16)}
          element="input"
          name="startDate"
          resourceName="startDate"
          type="date"
          required
          updateData={updateForm}
        />
        <Fieldset
          operation={operation}
          currentId={currentEndDate.substr(0, 16)}
          element="input"
          name="endDate"
          resourceName="endDate"
          type="date"
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
      <Modal
        showModal={showModal}
        type={modalType}
        content={modalContent}
        closeModalFn={closeModalFn}
      />
    </div>
  );
}

export default Form;
