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

  const resource = 'administrators';

  useEffect(() => {
    if (id) {
      fetch(`${url}/${resource}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const currentData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password
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
          setModalTitle('New admin added');
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
          setModalTitle('Admin Updated');
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
    if (!formData.firstName) setDisableProperty(true);
    else if (!formData.lastName) setDisableProperty(true);
    else if (!formData.email) setDisableProperty(true);
    else if (!formData.password) setDisableProperty(true);
    else setDisableProperty(false);
  };

  const closeModalFn = () => {
    setShowModal(false);
    history.push('/admins');
  };

  const showErrorMsg = (data) => {
    setModalType('error');
    setModalTitle('Upsss an error has happened');
    setModalContent(data);
    setShowModal(true);
  };

  return (
    <>
      <section className={styles.container}>
        {!id ? <h1>Add admin</h1> : <h1>Edit admin</h1>}
        <form className={styles.form} onSubmit={submitForm}>
          <Fieldset
            update={id ? true : false}
            currentValue={formData.firstName}
            element="input"
            resource="administrators"
            name="firstname"
            objectProperty="firstname"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.lastName}
            element="input"
            resource="administrators"
            name="lastname"
            objectProperty="lastname"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.email}
            element="input"
            resource="administrators"
            name="email"
            objectProperty="email"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.password}
            element="input"
            resource="administrators"
            inputType="password"
            name="password"
            objectProperty="password"
            required
            updateData={updateForm}
          />
          <button
            className={`${styles.buttonGreen} ${disableProperty && styles.disabled}`}
            type="submit"
            disabled={disableProperty}
          >
            Submit
          </button>
        </form>
        <Modal
          showModal={showModal}
          type={modalType}
          titleModal={modalTitle}
          content={modalContent}
          closeModalFn={closeModalFn}
        />
      </section>
    </>
  );
}

export default Form;
