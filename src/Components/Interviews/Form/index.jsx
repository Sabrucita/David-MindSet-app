import { useEffect } from 'react';
import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  createInterview,
  updateInterview,
  getInterview,
  getInterviewsOptions
} from '../../../redux/interviews/thunks';
import { interviewsCleanUp } from '../../../redux/interviews/actions';
import { Form, Field } from 'react-final-form';
import { pastDatesValidation } from '../../../validations';

function InterviewsForm({ match }) {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.interviews.selectedElement);
  const options = useSelector((store) => store.interviews.options);
  const modal = useSelector((store) => store.modal.show);

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    dispatch(getInterviewsOptions('candidates'));
    dispatch(getInterviewsOptions('companies'));
    if (operation === 'update') {
      dispatch(getInterview(id));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(interviewsCleanUp());
    };
  }, []);

  const submitForm = (formValues) => {
    if (operation === 'create') {
      return dispatch(createInterview(formValues));
    }
    dispatch(updateInterview(id, formValues));
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.idCandidate) {
      errors.idCandidate = 'Candidate is required.';
    }
    if (!formValues.idCompany) {
      errors.idCompany = 'Company is required.';
    }
    if (!formValues.date) {
      errors.date = 'Date is required.';
    } else {
      errors.date = pastDatesValidation(formValues.date);
    }
    return errors;
  };

  return (
    <>
      {modal && <Modal />}
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Create Interview</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Interview</h1>
        )}
        <Form
          onSubmit={submitForm}
          initialValues={formData}
          validate={validate}
          subscription={{
            submitting: true
          }}
          render={(formProps) => (
            <form className={styles.form} onSubmit={formProps.handleSubmit}>
              <Field
                name="idCandidate"
                label="Candidate"
                element="select"
                options={options.candidates}
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                name="idCompany"
                label="Company"
                element="select"
                options={options.companies}
                component={Fieldset}
                update={id ? true : false}
              />
              <Field
                name="date"
                label="Date"
                element="input"
                type="datetime-local"
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
                  className={styles.buttonGreen}
                  disabled={formProps.submitting}
                  type="submit"
                >
                  SUBMIT INTERVIEW
                </button>
              </div>
            </form>
          )}
        />
      </section>
    </>
  );
}

export default InterviewsForm;
