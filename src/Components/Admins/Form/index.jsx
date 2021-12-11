import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createAdmin, updateAdmin } from '../../../redux/applications/thunks';
import { hideModal } from '../../../redux/modal/actions';

function Form({ match, history }) {
  const [formData, setFormData] = useState({});
  const [disableProperty, setDisableProperty] = useState(true);

  const dispatch = useDispatch();
  const showModal = useSelector((store) => store.modal.show);
  const modalType = useSelector((store) => store.modal.type);
  const modalTitle = useSelector((store) => store.modal.title);
  const modalContent = useSelector((store) => store.modal.content);

  const url = process.env.REACT_APP_API;
  const id = match.params.id;
  let operation;

  const resource = 'administrators';

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    if (operation === 'update') {
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
        });
    }
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (operation === 'create') {
      dispatch(createAdmin(formData));
    } else {
      dispatch(updateAdmin(id, formData));
    }
    setDisableProperty(false);
  };

  const updateForm = (field, value) => {
    const newState = formData;
    newState[field] = value;
    setFormData(newState);
  };

  const closeModalFn = () => {
    dispatch(hideModal());
    if (modalType !== 'error') {
      history.push('/adminsitrators');
    }
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
            objectProperty="firstName"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.lastName}
            element="input"
            resource="administrators"
            name="lastname"
            objectProperty="lastName"
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
          <div className={styles.btnContainer}>
            <button
              className={`${styles.buttonGreen} ${disableProperty && styles.disabled}`}
              type="submit"
              disabled={disableProperty}
            >
              Submit
            </button>
          </div>
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
