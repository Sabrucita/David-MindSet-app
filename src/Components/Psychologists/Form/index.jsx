import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPsychologist,
  updatePsychologist,
  getPsychologist
} from '../../../redux/psychologists/thunks';
import {
  updateSelectedPsychologist,
  cleanSelectedElement
} from '../../../redux/psychologists/actions';
import { hideModal } from '../../../redux/modal/actions';

function Form({ match, history }) {
  const dispatch = useDispatch();
  const modalType = useSelector((store) => store.modal.type);
  const formData = useSelector((store) => store.psychologists.selectedElement);
  const [disableProperty, setDisableProperty] = useState(false);

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    dispatch(cleanSelectedElement());
    if (operation === 'update') {
      dispatch(getPsychologist(id));
    }
  }, [dispatch]);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (operation === 'create') {
      dispatch(createPsychologist(formData));
    } else {
      dispatch(updatePsychologist(id, formData));
    }
    setDisableProperty(false);
  };

  const updateForm = (field, value) => {
    dispatch(updateSelectedPsychologist(field, value));
  };

  const closeModalFn = () => {
    dispatch(hideModal());
    if (modalType !== 'error') {
      history.push('/psychologists');
    }
  };

  return (
    <>
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Add new psychologist</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit psychologist</h1>
        )}
        <form className={styles.form} onSubmit={submitForm}>
          <Fieldset
            update={id ? true : false}
            currentValue={formData.firstName}
            element="input"
            resource="pyschologists"
            name="firstname"
            objectProperty="firstName"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.lastName}
            element="input"
            resource="psychologists"
            name="lastname"
            objectProperty="lastName"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.email}
            element="input"
            resource="psychologists"
            name="email"
            objectProperty="email"
            required
            updateData={updateForm}
          />
          <Fieldset
            update={id ? true : false}
            currentValue={formData.password}
            element="input"
            resource="psychologists"
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
              SUBMIT PSYCHOLOGIST
            </button>
          </div>
        </form>
      </section>
      <Modal closeModalFn={closeModalFn} />
    </>
  );
}

export default Form;
