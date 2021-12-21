// import { useEffect } from 'react';
import Fieldset from 'Components/shared/Fieldset';
import styles from './signup.module.css';
import Modal from 'Components/shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createCandidates } from 'redux/admin/candidates/thunks';
import { Form, Field } from 'react-final-form';
import { validateText, validateEmail } from 'validations';

function SignUp1() {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.candidates.selectedElement);
  const modal = useSelector((store) => store.modal.show);

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
        <Form
          onSubmit={submitForm}
          initialValues={formData}
          validate={validate}
          subscription={{
            submitting: true
          }}
          render={({ handleSubmit }) => (
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
                label="Password"
                element="input"
                type="password"
                component={Fieldset}
              />
            </form>
          )}
        />
      </section>
      {modal && <Modal />}
    </>
  );
}

export default SignUp1;
