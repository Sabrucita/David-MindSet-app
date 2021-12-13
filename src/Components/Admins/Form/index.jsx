import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmin, createAdmin, updateAdmin } from '../../../redux/admins/thunks';
import { updateSelectedAdmin, adminsCleanUp } from '../../../redux/admins/actions';

function Form({ match }) {
  const [disableProperty, setDisableProperty] = useState(false);
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.admins.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    if (operation === 'update') {
      dispatch(getAdmin(id));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(adminsCleanUp());
    };
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
    dispatch(updateSelectedAdmin(field, value));
  };

  return (
    <>
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Add new admin</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit admin</h1>
        )}
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
              className={(styles.buttonAdd, styles.buttonGreen)}
              disabled={disableProperty}
              Addtype="submit"
            >
              SUBMIT ADMINISTRATOR
            </button>
          </div>
        </form>
      </section>
      {modal && <Modal />}
    </>
  );
}

export default Form;
