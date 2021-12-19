import { useEffect } from 'react';
import Fieldset from 'Components/shared/Fieldset';
import Modal from 'Components/shared/Modal';
import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createApplication,
  updateApplication,
  getApplication,
  getApplicationsOptions
} from 'redux/applications/thunks';
import { applicationsCleanUp } from 'redux/applications/actions';
import { Form, Field } from 'react-final-form';
import { validateText } from 'validations';

function ApplicationsForm({ match }) {
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

  const submitForm = (formValues) => {
    if (operation === 'create') {
      return dispatch(createApplication(formValues));
    }
    dispatch(updateApplication(id, formValues));
  };

  const validate = (formValues) => {
    const errors = {};
    errors.idCandidate = validateText(formValues.idCandidate, 'Candidate');
    errors.idOpenPosition = validateText(formValues.idOpenPosition, 'Open Position');
    return errors;
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
        <Form
          onSubmit={submitForm}
          initialValues={formData}
          validate={validate}
          subscription={{
            submitting: true
          }}
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
                name="idOpenPosition"
                label="Open Position"
                element="select"
                options={options.openPositions}
                component={Fieldset}
              />
              {id && (
                <Field
                  name="status"
                  label="Status"
                  element="input"
                  type="checkbox"
                  component={Fieldset}
                />
              )}
              <div className={styles.btnContainer}>
                <button
                  className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                  type="submit"
                  disabled={submitting || pristine}
                >
                  SUBMIT APPLICATION
                </button>
              </div>
            </form>
          )}
        />
      </section>
    </>
  );
}

export default ApplicationsForm;
