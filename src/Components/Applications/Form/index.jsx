import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
const url = process.env.REACT_APP_API;

function Form({ match, history }) {
  const [formData, setFormData] = useState({});
  const [modalContent, setModalContent] = useState();
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState();
  const [disableProperty, setDisableProperty] = useState(false);

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    if (operation === 'update') {
      fetch(`${url}/applications/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const currentData = {
            idCandidate: data.idCandidate._id,
            idOpenPosition: data.idOpenPosition._id,
            isActive: data.isActive
          };
          setFormData(currentData);
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (operation === 'create') {
      fetch(`${url}/applications`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          const data = await res.json();
          setShowModal(true);
          if (data.data) {
            setModalType('create');
            setTitleModal('Application Created');
            return setModalContent(data.data);
          }
          msgError(data);
        })
        .catch((err) => {
          msgError(err);
          setShowModal(true);
        });
    } else {
      fetch(`${url}/applications/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(async (res) => {
          const data = await res.json();
          setShowModal(true);
          if (data.data) {
            setModalType('update');
            setTitleModal('Application Updated');
            return setModalContent(data.data);
          }
          msgError(data);
        })
        .catch((err) => {
          msgError(err);
          setShowModal(true);
        });
    }
  };

  const msgError = (data) => {
    setModalType('error');
    setTitleModal('Upsss an error has happened');
    setModalContent(data);
    setDisableProperty(false);
  };

  const updateForm = (field, value) => {
    const newState = formData;
    newState[field] = value;
    setFormData(newState);
  };

  const closeModalFn = () => {
    setShowModal(false);
    if (disableProperty) {
      history.goBack();
    }
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
          objectProperty="idCandidate"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.idOpenPosition}
          element="select"
          resource="open-positions"
          name="open-position"
          objectProperty="idOpenPosition"
          required
          updateData={updateForm}
        />
        {id && (
          <Fieldset
            update={id ? true : false}
            currentValue={formData.isActive ? true : false}
            element="input"
            inputType="checkbox"
            name="status"
            objectProperty="isActive"
            updateData={updateForm}
          />
        )}
        <button
          className={(styles.buttonAdd, styles.buttonGreen)}
          disabled={disableProperty}
          Addtype="submit"
        >
          SUBMIT APPLICATION
        </button>
      </form>
      <Modal
        showModal={showModal}
        type={modalType}
        content={modalContent}
        closeModalFn={closeModalFn}
        titleModal={titleModal}
      />
    </div>
  );
}

export default Form;
