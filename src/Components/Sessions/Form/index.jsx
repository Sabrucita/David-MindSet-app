import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../Modal';
import styles from './form.module.css';
const url = process.env.REACT_APP_API;

function Form() {
  const [formData, setFormData] = useState({});
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
      fetch(`${url}/sessions/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const currentData = {
            idCandidate: data.data.idCandidate._id,
            idPsychologists: data.data.idPsychologists._id,
            date: data.data.date
          };
          setFormData(currentData);
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (operation === 'create') {
      fetch(`${url}/sessions`, {
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
      fetch(`${url}/sessions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          const data = await res.json();
          setShowModal(true);
          setModalType('update');
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
    window.location.href = '/sessions';
  };

  return (
    <div>
      {operation === 'create' ? <h2>Create Session</h2> : <h2>Edit Session</h2>}
      <form className={styles.form} onSubmit={submitForm}>
        <Fieldset
          update={id ? true : false}
          currentValue={formData.idCandidate}
          element="select"
          resource="candidates"
          name="candidate"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.idPsychologists}
          element="select"
          resource="psychologists"
          name="psychologist"
          objectProperty="idPsychologists"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.date ? formData.date.substr(0, 16) : ''}
          element="input"
          name="date"
          objectProperty="date"
          inputType="datetime-local"
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
