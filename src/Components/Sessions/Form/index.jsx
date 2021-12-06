import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';

function Form({ match, history }) {
  const [formData, setFormData] = useState({});
  const [disableProperty, setDisableProperty] = useState(true);
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
            idCandidate: data.idCandidate?._id,
            idPsychologist: data.idPsychologist?._id,
            date: data.date
          };
          setFormData(currentData);
          setDisableProperty(false);
        })
        .catch((err) => {
          showErrorMsg(err);
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
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
          setModalContent(data.data);
        })
        .catch((err) => {
          showErrorMsg(err);
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
          setModalContent(data.data);
        })
        .catch((err) => {
          showErrorMsg(err);
        });
    }
  };

  const updateForm = (field, value) => {
    const newState = formData;
    newState[field] = value;
    setFormData(newState);
    validateFields();
  };

  const validateFields = () => {
    if (!formData.idCandidate) setDisableProperty(true);
    else if (!formData.idPsychologist) setDisableProperty(true);
    else if (!formData.date) setDisableProperty(true);
    else setDisableProperty(false);
  };

  const closeModalFn = () => {
    setShowModal(false);
    history.push('/sessions');
  };

  const showErrorMsg = (data) => {
    setModalType('error');
    setModalTitle('Upsss an error has happened');
    setModalContent(data);
    setShowModal(true);
  };

  return (
    <>
      <Modal
        showModal={showModal}
        type={modalType}
        titleModal={modalTitle}
        content={modalContent}
        closeModalFn={closeModalFn}
      />
      <section className={styles.container}>
        {!id ? <h1>Create Session</h1> : <h1>Edit Session</h1>}
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
          <button
            className={`${styles.buttonGreen} ${disableProperty && styles.disabled}`}
            type="submit"
            disabled={disableProperty}
          >
            SUBMIT SESSION
          </button>
        </form>
      </section>
    </>
  );
}

export default Form;
