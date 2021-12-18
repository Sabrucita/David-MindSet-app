import Fieldset from '../../shared/Fieldset';
import Modal from '../../shared/Modal';
import styles from './form.module.css';
import { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPsychologist,
  updatePsychologist,
  getPsychologist
} from '../../../redux/psychologists/thunks';
import { psychologistsCleanUp } from '../../../redux/psychologists/actions';
import { validateText, validateEmail } from '../../../validations';

function PsychologistsForm({ match }) {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.psychologists.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  const id = match.params.id;
  let operation;

  if (id) operation = 'update';
  else operation = 'create';

  useEffect(() => {
    if (operation === 'update') {
      dispatch(getPsychologist(id));
    }
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(psychologistsCleanUp());
    };
  }, []);

  const submitForm = (formValues) => {
    if (operation === 'create') {
      dispatch(createPsychologist(formValues));
    } else {
      dispatch(updatePsychologist(id, formValues));
    }
  };

  const validate = (formValues) => {
    const errors = {};
    errors.firstName = validateText(formValues.firstName, 'First Name', 2, 40);
    errors.lastName = validateText(formValues.lastName, 'Last Name', 2, 40);
    errors.password = validateText(formValues.password, 'Password', 8, 16);
    errors.email = validateEmail(formValues.email);
    return errors;
  };
  return (
    <>
      <section className={styles.container}>
        {operation === 'create' ? (
          <h1 className={styles.mainTitle}>Add psychologist</h1>
        ) : (
          <h1 className={styles.mainTitle}>Edit psychologist</h1>
        )}
        <Form
          onSubmit={submitForm}
          initialValues={formData}
          validate={validate}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field
                name="firstName"
                label="First Name"
                element="input"
                type="text"
                component={Fieldset}
              />
              <Field
                name="lastName"
                label="Last Name"
                element="input"
                type="text"
                component={Fieldset}
              />
              <Field name="email" label="Email" element="input" type="email" component={Fieldset} />
              <Field
                name="password"
                label="Password"
                element="input"
                type="password"
                component={Fieldset}
              />
              <div className={styles.btnContainer}>
                <button
                  className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                  type="submit"
                  disabled={submitting || pristine}
                >
                  SUBMIT PSYCHOLOGIST
                </button>
              </div>
            </form>
          )}
        />
      </section>
      {modal && <Modal />}
    </>
  );
}

export default PsychologistsForm;
