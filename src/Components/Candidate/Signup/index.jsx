import { useEffect } from 'react';
import Fieldset from 'Components/shared/Fieldset';
import styles from './signup.module.css';
import Modal from 'Components/shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createCandidates } from 'redux/admin/candidates/thunks';
import { candidatesCleanUp } from 'redux/admin/candidates/actions';
import { Form, Field } from 'react-final-form';
import { validateEmail, validateText } from 'validations';

function SignUp() {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);

  useEffect(() => {
    return () => {
      dispatch(candidatesCleanUp());
    };
  }, []);

  const submitForm = (formValues) => {
    return dispatch(createCandidates(formValues));
  };

  const validate = (formValues) => {
    const errors = {};
    errors.email = validateEmail(formValues.email);
    errors.password = validateText(formValues.password, 'Password', 8, 16);
    return errors;
  };

  return (
    <>
      <section className={styles.container}>
        <h1 className={styles.mainTitle}>Sign Up</h1>
        <Form
          onSubmit={submitForm}
          initialValues={formData}
          validate={validate}
          subscription={{
            submitting: true
          }}
          render={({ handleSubmit, submitting, pristine }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field name="email" label="Email" element="input" type="email" component={Fieldset} />
              <Field
                name="password"
                label="Password"
                element="input"
                type="password"
                component={Fieldset}
              />
              <Field
                name="password"
                label="Confirm Password"
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
                  Continue
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

export default SignUp;
