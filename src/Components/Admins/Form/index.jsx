import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
const url = process.env.REACT_APP_API;

function Form({ match }) {
  const [formData, setFormData] = useState({});
  const [modalContent, setModalContent] = useState();
  const [modalType, setModalType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState();

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    if (operation === 'update') {
      fetch(`${url}/administrators/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const currentData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            isActive: data.isActive
          };
          setFormData(currentData);
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (operation === 'create') {
      fetch(`${url}/administrators`, {
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
          setTitleModal('New admin added');
          setModalContent(data.data);
        })
        .catch(() => {
          setShowModal(true);
          setModalType('error');
        });
    } else {
      fetch(`${url}/administrators/${id}`, {
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
          setTitleModal('Administrators Updated');
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
    // window.location.href = '/admins';
  };

  return (
    <div>
      {operation === 'create' ? <h2>Add admins</h2> : <h2>Edit admin</h2>}
      <form className={styles.form} onSubmit={submitForm}>
        <Fieldset
          update={id ? true : false}
          currentValue={formData.firstName}
          element="input"
          resource="admins"
          name="firstname"
          objectProperty="name"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.lastName}
          element="input"
          resource="admins"
          name="lastname"
          objectProperty="name"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.email}
          element="input"
          resource="admins"
          name="email"
          objectProperty="email"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.pictureUrl}
          element="input"
          resource="admins"
          name="password"
          objectProperty="password"
          required
          updateData={updateForm}
        />
        <Fieldset
          update={id ? true : false}
          currentValue={formData.isActive ? true : false}
          element="input"
          resource="companies"
          name="isActive"
          inputType="checkbox"
          objectProperty="isActive"
          updateData={updateForm}
        />
        <button type="submit">Submit</button>
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
