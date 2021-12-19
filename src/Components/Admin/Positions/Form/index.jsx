import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { positionsCleanup } from 'redux/admin/positions/actions';
import { laterDateValidation, pastDatesValidation, validateText } from 'validations';
import {
  createPosition,
  getPosition,
  getPositionsOptions,
  updatePosition
} from 'redux/admin/positions/thunks';
import Fieldset from 'Components/shared/Fieldset';
import Modal from 'Components/shared/Modal';
import styles from './form.module.css';

function PositionsForm({ match }) {
  const dispatch = useDispatch();
  const options = useSelector((store) => store.positions.options);
  const formData = useSelector((store) => store.positions.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const id = match.params.id;

  useEffect(() => {
    dispatch(getPositionsOptions('companies'));
    if (id) {
      dispatch(getPosition(id));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(positionsCleanup());
    };
  }, []);

  const submitForm = (formData) => {
    if (id) return dispatch(updatePosition(id, formData));
    dispatch(createPosition(formData));
  };

  const validate = (formValues) => {
    const errors = {};
    errors.idCompany = validateText(formValues.idCompany, 'Company');
    errors.startDate = pastDatesValidation(formValues.startDate);
    errors.endDate = laterDateValidation(formValues.startDate, formValues.endDate);
    errors.jobDescription = validateText(formValues.jobDescription, 'Job description', 10, 500);
    return errors;
  };

  return (
    <>
      {modal && <Modal />}
      <section className={styles.container}>
        {!id ? (
          <h1 className={styles.mainTitle}>Create Position</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit Position</h1>
        )}
        <Form
          onSubmit={submitForm}
          initialValues={formData}
          validate={validate}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field
                name="idCompany"
                label="Company"
                element="select"
                options={options.companies}
                component={Fieldset}
              />
              <Field
                name="startDate"
                label="Start Date"
                element="input"
                type="date"
                component={Fieldset}
              />
              <Field
                name="endDate"
                label="End Date"
                element="input"
                type="date"
                component={Fieldset}
              />
              <Field
                name="jobDescription"
                label="Job Description"
                element="input"
                type="text"
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

export default PositionsForm;
