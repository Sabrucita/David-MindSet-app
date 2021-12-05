import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';

function Form({ match }) {
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState();

  const url = process.env.REACT_APP_API;
  const id = match.params.id;

  const resource = 'sessions';

  useEffect(() => {
    if (id) {
      fetch(`${url}/${resource}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const currentData = {
            idCandidate: data.idCandidate._id,
            idPsychologist: data.idPsychologist._id,
            date: data.date
          };
          setFormData(currentData);
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (!id) {
      fetch(`${url}/${resource}`, {
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
          setModalTitle('Application Created');
          setModalContent(data);
        })
        .catch(() => {
          setShowModal(true);
          setModalType('error');
        });
    } else {
      fetch(`${url}/${resource}/${id}`, {
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
          setModalTitle('Application Updated');
          setModalContent(data);
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
      {!id ? <h2>Create Session</h2> : <h2>Edit Session</h2>}
      <form className={styles.form} onSubmit={submitForm}>
        <Fieldset
          update={id ? true : false}
          currentValue={formData.idCandidate}
          element="select"
          resource="candidates"
          name="candidate"
          objectProperty="idCandidate"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.idPsychologist}
          element="select"
          resource="psychologists"
          name="psychologist"
          objectProperty="idPsychologist"
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
        titleModal={modalTitle}
        content={modalContent}
        closeModalFn={closeModalFn}
      />
    </div>
  );
}

export default Form;
