import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import styles from './form.module.css';
import Modal from '../../shared/Modal';
const url = process.env.REACT_APP_API;

function Form({ match, history }) {
  // let typeForm;
  // let idToUpdate;
  // if (!window.location.search) {
  //   typeForm = 'create';
  // } else {
  //   typeForm = 'update';
  //   idToUpdate = window.location.search.slice(1);
  // }
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
      fetch(`${url}/profile-types/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const currentData = {
            idProfile: data._id,
            name: data.name
          };
          setFormData(currentData);
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (operation === 'create') {
      fetch(`${url}/profile-types`, {
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
            setTitleModal('Profile Type Created');
            return setModalContent(data.data);
          }
          msgError(data);
        })
        .catch((err) => {
          msgError(err);
          setShowModal(true);
        });
    } else {
      fetch(`${url}/profile-types/${id}`, {
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
            setTitleModal('Profile Type Updated');
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
      history.push('/profiles');
    }
  };

  return (
    <div className={styles.container}>
      {operation === 'create' ? <h2>Create Profile Type</h2> : <h2>Edit Profile Type</h2>}
      <form className={styles.form} onSubmit={submitForm}>
        <Fieldset
          update={id ? true : false}
          currentValue={formData.name}
          element="input"
          name="name"
          displayedName="Profile Type Name"
          objectProperty="name"
          required
          updateData={updateForm}
          inputType="text"
        />
        <button
          className={(styles.buttonAdd, styles.buttonGreen)}
          disabled={disableProperty}
          Addtype="submit"
        >
          SUBMIT PROFILE-TYPE
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
