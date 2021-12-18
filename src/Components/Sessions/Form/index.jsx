import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { sessionsCleanup } from '../../../redux/sessions/actions';
import { pastDatesValidation, validateText } from '../../../validations';
import {
  createSession,
  getSession,
  getSessionsOptions,
  updateSession
} from '../../../redux/sessions/thunks';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';

function SessionsForm({ match }) {
  const dispatch = useDispatch();
  const options = useSelector((store) => store.sessions.options);
  const formData = useSelector((store) => store.sessions.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const id = match.params.id;

  useEffect(() => {
    dispatch(getSessionsOptions('candidates'));
    dispatch(getSessionsOptions('psychologists'));
    if (id) {
      dispatch(getSession(id));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(sessionsCleanup());
    };
  }, []);

  const submitForm = (formData) => {
    if (id) return dispatch(updateSession(id, formData));
    dispatch(createSession(formData));
  };

  const validate = (formValues) => {
    const errors = {};
    errors.idCandidate = validateText(formValues.idCandidate, 'Candidate');
    errors.idPsychologist = validateText(formValues.idPsychologist, 'Psychologist');
    errors.date = pastDatesValidation(formValues.date);
    return errors;
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
        <Form
          onSubmit={submitForm}
          initialValues={formData}
          validate={validate}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field
                name="idCandidate"
                label="Candidate"
                element="select"
                options={options.candidates}
                component={Fieldset}
              />
              <Field
                name="idPsychologist"
                label="Psychologist"
                element="select"
                options={options.psychologists}
                component={Fieldset}
              />
              <Field
                name="date"
                label="Date"
                element="input"
                type="datetime-local"
                component={Fieldset}
              />
              <div className={styles.btnContainer}>
                <button
                  className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                  type="submit"
                  disabled={submitting || pristine}
                >
                  SUBMIT SESSION
                </button>
              </div>
            </form>
          )}
        />
      </section>
    </>
  );
}

export default SessionsForm;
