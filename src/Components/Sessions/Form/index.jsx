import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sessionsCleanup, updateSelectedSession } from '../../../redux/sessions/actions';
import {
  createSession,
  getSession,
  getSessionsOptions,
  updateSession
} from '../../../redux/sessions/thunks';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';

function Form({ match }) {
  const dispatch = useDispatch();
  const options = useSelector((store) => store.sessions.options);
  const formData = useSelector((store) => store.sessions.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const [disableProperty, setDisableProperty] = useState(true);

  const id = match.params.id;

  useEffect(() => {
    dispatch(getSessionsOptions('candidates'));
    dispatch(getSessionsOptions('psychologists'));
    if (id) {
      dispatch(getSession(id));
    }
  }, [dispatch]);

  useEffect(() => {
    validateFields();
  }, [formData]);

  useEffect(() => {
    return () => {
      dispatch(sessionsCleanup());
    };
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    setDisableProperty(true);
    if (!id) {
      dispatch(createSession(formData));
    } else {
      dispatch(updateSession(id, formData));
    }
  };

  const updateForm = (field, value) => {
    dispatch(updateSelectedSession(field, value));
  };

  const validateFields = () => {
    if (!formData.idCandidate) setDisableProperty(true);
    else if (!formData.idPsychologist) setDisableProperty(true);
    else if (!formData.date) setDisableProperty(true);
    else setDisableProperty(false);
  };

  return (
    <>
      {modal && <Modal />}
      <section className={styles.container}>
        {!id ? (
          <h1 className={styles.mainTitle}>Create Session</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Session</h1>
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
            currentValue={formData.idPsychologist}
            element="select"
            name="psychologist"
            objectProperty="idPsychologist"
            required
            updateData={updateForm}
            options={options.psychologists}
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
          <div className={styles.btnContainer}>
            <button
              className={`${styles.buttonGreen} ${disableProperty && styles.disabled}`}
              type="submit"
              disabled={disableProperty}
            >
              SUBMIT SESSION
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Form;
