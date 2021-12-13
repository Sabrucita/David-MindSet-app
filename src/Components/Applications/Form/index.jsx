import { useState, useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createApplication,
  updateApplication,
  getApplication,
  getApplicationsOptions
} from '../../../redux/applications/thunks';
import {
  updateSelectedApplication,
  applicationsCleanUp
} from '../../../redux/applications/actions';

function Form({ match }) {
  const [disableProperty, setDisableProperty] = useState(false);

  const dispatch = useDispatch();
  const formData = useSelector((store) => store.applications.selectedElement);
  const options = useSelector((store) => store.applications.options);
  const modal = useSelector((store) => store.modal.show);

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    dispatch(getApplicationsOptions('candidates'));
    dispatch(getApplicationsOptions('open-positions'));
    if (operation === 'update') {
      dispatch(getApplication(id));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(applicationsCleanUp());
    };
  }, []);

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

  return (
    <>
      {modal && <Modal />}
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
            name="candidate"
            objectProperty="idCandidate"
            required
            updateData={updateForm}
            options={options.candidates}
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
            options={options.openPositions}
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
