import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createApplication,
  updateApplication,
  getApplication
} from '../../../redux/applications/thunks';
import {
  updateSelectedApplication,
  cleanSelectedElement
} from '../../../redux/applications/actions';
import { hideModal } from '../../../redux/modal/actions';

function Form({ match, history }) {
  const [disableProperty, setDisableProperty] = useState(false);

  const dispatch = useDispatch();
  const showModal = useSelector((store) => store.modal.show);
  const modalType = useSelector((store) => store.modal.type);
  const modalTitle = useSelector((store) => store.modal.title);
  const modalContent = useSelector((store) => store.modal.content);
  const formData = useSelector((store) => store.applications.selectedElement);
  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    //to fix problem when you enter in CreateForm after you edited another element.
    dispatch(cleanSelectedElement());
    if (operation === 'update') {
      dispatch(getApplication(id));
    }
  }, [dispatch]);

  const submitForm = (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (operation === 'create') {
      dispatch(createApplication(formData));
    } else {
      dispatch(updateApplication(id, formData));
    }
    setDisableProperty(false);
  };

  const updateForm = (field, value) => {
    dispatch(updateSelectedApplication(field, value));
  };

  const closeModalFn = () => {
    dispatch(hideModal());
    if (modalType !== 'error') {
      history.push('/applications');
    }
  };

  return (
    <>
      <Modal
        showModal={showModal}
        type={modalType}
        content={modalContent}
        closeModalFn={closeModalFn}
        titleModal={modalTitle}
      />
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Create Application</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Application</h1>
        )}
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
              currentValue={formData.status ? true : false}
              element="input"
              inputType="checkbox"
              name="status"
              objectProperty="status"
              updateData={updateForm}
            />
          )}
          <div className={styles.btnContainer}>
            <button className={styles.buttonGreen} disabled={disableProperty} Addtype="submit">
              SUBMIT APPLICATION
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Form;
